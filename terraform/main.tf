provider "aws" {
  region = "us-east-1"
}
resource aws_key_pair "one_click" {
  key_name   = "${var.key-name}"
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
  user_data              = "${data.template_file.script.rendered}"

  connection {
    host        = "${aws_instance.uberapp.public_dns}"
    type        = "ssh"
    user        = "ubuntu"
    private_key = "${file("${var.path_to_private_key}")}"
  }
  # provisioner "file" {
  #   source = "${var.path_to_UberBusApp}"
  #   destination = "/home/ubuntu"
  # }

  provisioner "remote-exec" {
    inline = [
      "sudo apt update",
      "sudo apt install software-properties-common",
      "sudo add-apt-repository ppa:deadsnakes/ppa -y",
      "sudo apt install python3.9 -y",
      "sudo apt install -y python3-pip",
      "sudo apt-get install tmux -y",
      "sudo apt install git -y",
      "sudo git clone https://github.com/Maheshwari-Priyanka/UberBusApp.git",
      "cd UberBusApp/uberbe",
      "sudo apt install python3-venv -y",
      "python3.8 -m venv uberenv",
      "source uberenv/bin/activate",
      "pip3 install wheel",
      "pip3 install flask",
      "pip3 install gunicorn",
      "pip3 install python-dotenv",
      "pip3 install flask-cors",
      "pip3 install flask-api",
      "pip3 install pymongo",
      "pip3 install requests",
      "pip3 install python-dateutil", "pip3 install pytz", "pip3 install dnspython",
      "sudo mv uberbe.service /etc/systemd/system/uberbe.service",
      "sudo systemctl daemon-reload",
      "sudo systemctl start uberbe",
      "sudo systemctl enable uberbe",
      "echo '**********NGINX and node**********'",
      "cd",
      "sudo apt-get update",
      "sudo apt remove -y libcurl4",
      "sudo apt-get install -y libcurl4 curl",
      "curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -",
      "sudo apt-get install -y nodejs",
      "sudo apt-get install -y build-essential",
      "sudo apt-get install -y ruby",
      "sudo apt-get install nginx -y",
      "cd UberBusApp/client/uber-bus-app",
      "touch .env",
      "sudo echo REACT_APP_FLASK_IP_ADDRESS=${aws_eip.uberapp_eip.public_ip} >> .env",
      "sudo npm install",
      "sudo npm run build",
      "cd ~",
      "sudo rm /etc/nginx/sites-enabled/default",
      "sudo mv UberBusApp/client/uber-bus-app/uber.nginx /etc/nginx/sites-available/",
      "sudo ln -s /etc/nginx/sites-available/uber.nginx /etc/nginx/sites-enabled/uber.nginx",
      "sudo systemctl start nginx",
      "sudo systemctl reload nginx"
    ]
  }

}

# User_data
data "template_file" "script" {
  template = "${file("${path.module}/cloud-config.yml")}"

  vars = {
    flask_ip_address = "${aws_eip.uberapp_eip.public_ip}"
  }
}

data "template_cloudinit_config" "config" {
  gzip          = true
  base64_encode = true

  part {
    filename     = "init.cfg"
    content_type = "text/cloud-config"
    content      = "${data.template_file.script.rendered}"
  }

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
