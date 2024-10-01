# defining the outputs needed after completion of execution

# outputs for ec2 frontend webserver
output "frontend-webserver-dns" {
    value = aws_instance.frontend-webserver.public_dns
}

output "frontend-webserver-ip" {
    value = aws_instance.frontend-webserver.public_ip
}

output "frontend-webserver-private-dns" {
    value = aws_instance.frontend-webserver.private_dns
}

output "frontend-webserver-private-ip" {
    value = aws_instance.frontend-webserver.private_ip
}

# outputs for backend webserver
output "backend-webserver-dns" {
    value = aws_instance.backend-webserver.public_dns
}

output "backend-webserver-ip" {
    value = aws_instance.backend-webserver.public_ip
}

output "backend-webserver-private-dns" {
    value = aws_instance.backend-webserver.private_dns
}

output "backend-webserver-private-ip" {
    value = aws_instance.backend-webserver.private_ip
}
