variable "aws_access_key" {
  description = "The AWS access key."
}

variable "aws_secret_key" {
  description = "The AWS secret key."
}

variable "aws_region" {
  description = "The AWS region to create resources in."
  default = "us-east-1"
}

variable "aws_azs" {
  description = "The availability zone."
  default = "us-east-1a"
}

variable "domain" {
  description = "The DNS zone managed by AWS Route53 to create the subdomain record in."
}

variable "subdomain" {
  description = "The subdomain to create in the zone."
}

variable "app_address" {
  description = "Address to point CNAME record to."
}
