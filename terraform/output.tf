output "public_dns" {
  value = "${aws_instance.uberapp.public_dns}"
}
output "eip" {
  value = "${aws_eip.uberapp_eip.public_ip}"
}