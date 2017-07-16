data "aws_route53_zone" "selected" {
  name = "${var.domain}."
}

resource "aws_route53_record" "prbarker" {
  zone_id = "${data.aws_route53_zone.selected.zone_id}"
  name    = "${var.subdomain}"
  type    = "CNAME"
  ttl     = 300
  records = ["${var.app_address}"]
}
