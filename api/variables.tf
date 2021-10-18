# Input variable definitions

variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "us-east-1"
}

variable "PRIVATE_KEY" {
  type = string
}

variable "CERT" {
  type = string
}

variable "PRIVATE_KEY_PW" {
  type = string
}