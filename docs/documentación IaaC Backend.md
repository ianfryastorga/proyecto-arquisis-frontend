
# Documentación IaaC Backend

Esta guía detalla los pasos necesarios para configurar Infraestructura como Código (IaaC) en Backend utilizando Terraform y AWS.

## Prerrequisitos

- Cuenta en AWS con permisos para crear y gestionar servicios EC2.
- Repositorio en GitHub.

## Pasos Detallados

### 1. Instalar Terraform

Sigue las instrucciones en la [guía oficial de Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli).

### 2. Configurar AWS CLI

1. Ve a IAM en Amazon AWS.
2. Crea un usuario.
3. Añade la política de `EC2FullAccess`.
4. Sigue estos pasos para configurar AWS CLI: [Guía de configuración del AWS CLI](https://docs.aws.amazon.com/es_es/cli/v1/userguide/cli-chap-configure.html).

### 3. Obtener credenciales necesarias para configurar Terraform

1. Ve a EC2 en Amazon AWS y selecciona "Lanzar instancia". Desde aquí debes obtener el AMI ID, Key y la región.
2. Crea el archivo `main.tf` con la siguiente información, cambiando los valores de `ami`, `key_name` y `region` por los correspondientes:

\`\`\`hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-2"
}

resource "aws_instance" "my_instance" {
  ami           = "ami-0f30a9c3a48f3fa79" # AMI ID for Ubuntu 20.04 LTS (free tier)
  instance_type = "t2.micro"
  key_name      = "llave-proyecto"
  vpc_security_group_ids = [aws_security_group.my_security_group.id]

  user_data = "${file("./scripts/deployment.sh")}"
  tags = {
    Name = "instancia-ec2"
  }
}

resource "aws_eip" "my_eip" {
  instance = aws_instance.my_instance.id
}

resource "aws_security_group" "my_security_group" {
  name        = "my-security-group1"
  description = "Security group for SSH access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

output "elastic_ip" {
  value = aws_eip.my_eip.public_ip
}

output "ssh_command" {
  value = "ssh -i ${aws_instance.my_instance.key_name}.pem ubuntu@${aws_eip.my_eip.public_ip}"
}
\`\`\`

### 4. Crear el archivo `scripts/deployment.sh`

\`\`\`bash
#!/bin/bash

# Actualizar el sistema
sudo apt update -y
sudo apt upgrade -y

# Instalar repositorio APT de Docker
sudo apt install ca-certificates curl gnupg -y
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt update -y
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# Instalar NGINX
sudo apt install nginx -y

# Iniciar y habilitar Docker
sudo systemctl start docker
sudo systemctl enable docker

# Iniciar y habilitar NGINX
sudo systemctl start nginx
sudo systemctl enable nginx

# Imprimir el estado de Docker y NGINX
sudo systemctl status docker
sudo systemctl status nginx
\`\`\`

Este archivo instalará Docker y NGINX dentro de la instancia.

## Enlaces Útiles

- [Documentación de Terraform para AWS](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Encuentra un AMI en AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/finding-an-ami.html)
- [Configuración de salidas en Terraform](https://developer.hashicorp.com/terraform/language/values/outputs)

Con estos pasos, tendrás tu infraestructura backend configurada utilizando IaaC.
