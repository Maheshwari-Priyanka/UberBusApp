variable "instance_name_base" {
  default = "uberapp"
}
variable "path_to_public_key" {
  description = "Public key file"
  default = "/home/manasa/.ssh/id_rsa.pub"
}
variable "path_to_private_key" {
  description = "Private key file"
  default = "/home/manasa/.ssh/id_rsa2"
}
variable "path_to_UberBusApp" {
  description = "application path"
  default = "/home/manasa/Documents/Spring2021/Assignments/UberBusApp"
}
variable "key-name" {
  description = "key-name"
  default = "id_rsa"
}
