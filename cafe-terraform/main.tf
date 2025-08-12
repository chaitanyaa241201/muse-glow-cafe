provider "aws" {
  region = "us-east-2"
}

# --- S3 Bucket ---
resource "aws_s3_bucket" "cafe_site" {
  bucket = "muse-glow-cafe-static-site-2025"
}

# Website hosting config
resource "aws_s3_bucket_website_configuration" "cafe_site_website" {
  bucket = aws_s3_bucket.cafe_site.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# Public access policy
resource "aws_s3_bucket_policy" "allow_public_access" {
  bucket = aws_s3_bucket.cafe_site.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "PublicReadGetObject",
        Effect    = "Allow",
        Principal = "*",
        Action    = ["s3:GetObject"],
        Resource  = ["${aws_s3_bucket.cafe_site.arn}/*"]
      }
    ]
  })
}

# --- CloudFront Origin Access Control (OAC) ---
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "cafe-site-oac"
  description                       = "OAC for Muse Glow Cafe site"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# --- CloudFront Distribution ---
resource "aws_cloudfront_distribution" "cafe_distribution" {
  enabled             = true
  default_root_object = "index.html"

  origin {
    domain_name              = aws_s3_bucket.cafe_site.bucket_regional_domain_name
    origin_id                = "S3-muse-glow-cafe"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  default_cache_behavior {
    target_origin_id       = "S3-muse-glow-cafe"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Output the CloudFront URL
output "cloudfront_url" {
  value = aws_cloudfront_distribution.cafe_distribution.domain_name
}

