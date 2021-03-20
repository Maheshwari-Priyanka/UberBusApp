provider "aws" {
  region = "us-east-1"
}
resource aws_key_pair "one_click" {
  key_name   = "id_rsa"
  public_key = "${file("${var.path_to_public_key}")}"
}

resource "aws_vpc" "vpc_uber" {
  cidr_block       = "10.0.0.0/16"
  instance_tenancy = "default"

  tags = {
    Name = "UberVpc"
  }
}

resource "aws_subnet" "public_subnet_uber" {
  vpc_id     = "${aws_vpc.vpc_uber.id}"
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "Uber-Public-Subnet"
  }
}

resource "aws_subnet" "private_subnet_uber" {
  vpc_id     = "${aws_vpc.vpc_uber.id}"
  cidr_block = "10.0.2.0/24"

  tags = {
    Name = "Uber-Private-Subnet"
  }
}

resource "aws_internet_gateway" "uber_igw" {
  vpc_id = "${aws_vpc.vpc_uber.id}"

  tags = {
    Name = "Uber-igw"
  }
}

resource "aws_route_table" "route_table" {
  vpc_id = "${aws_vpc.vpc_uber.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.uber_igw.id
  }

  route {
    ipv6_cidr_block = "::/0"
    gateway_id      = aws_internet_gateway.uber_igw.id
  }

  tags = {
    Name = "main"
  }
}

resource "aws_route_table_association" "public_subnet_rt" {
  subnet_id      = aws_subnet.public_subnet_uber.id
  route_table_id = aws_route_table.route_table.id
}

resource "aws_route_table_association" "private_subnet_rt" {
  subnet_id      = aws_subnet.private_subnet_uber.id
  route_table_id = aws_route_table.route_table.id
}


resource "aws_eip" "uberapp_eip" {
  vpc = true
}


resource "aws_instance" "uberapp" {
  ami                    = "ami-042e8287309f5df03"
  instance_type          = "t2.micro"
  key_name               = "${aws_key_pair.one_click.key_name}"
  vpc_security_group_ids = ["${aws_security_group.allow_react_and_ssh.id}"]

}


resource "aws_security_group" "allow_react_and_ssh" {
  name = "allow_react_and_ssh"
  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    protocol    = "tcp"
    from_port   = 22
    to_port     = 22
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    protocol    = "tcp"
    from_port   = 3000
    to_port     = 3000
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_eip_association" "uber_eip_assoc" {
  instance_id   = "${aws_instance.uberapp.id}"
  allocation_id = "${aws_eip.uberapp_eip.id}"
}