# describing an ec2 instance for web backend server
resource "aws_instance" "backend-webserver" {
    # using standard ami and instance type defined in parameters
    ami           = var.ami_id
    instance_type = var.instance_type

    # using the public subnet
    subnet_id     = module.vpc.subnet_public_id

    # predefined key for terraform in AWS
    key_name      = "terraform-key"
    vpc_security_group_ids = [ aws_security_group.ec2-sg.id ]
    associate_public_ip_address = true

    # Assigning name tag
    tags = {
        Name = "backend-webserver"
    }

    # declaring dependencies
    depends_on = [ module.vpc.vpc_id, module.vpc.igw_id]

    # shell script to be run after initializing the server
    /*
        This shell script will install required dependencies and on the server.
        It will run the backend service on this service.
        and start the email server as well
    */
    user_data = <<EOF
#!/bin/sh
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install --yes nodejs
sudo apt install npm -y
sudo npm install -g n
sudo npm i -g npx
mkdir project
cd project
git clone https://github.com/het-patel99/Recipe_Recommender.git
cd Recipe_Recommender/Code/backend
sudo sed -i 's/##gmail_password##/${var.email_password}/g' /project/Recipe_Recommender/Code/backend/dao/mail_param.js
sudo npm install nodemailer
sudo npm install
npx nodemon
EOF
}


# describing an ec2 instance for frontend-webserver
resource "aws_instance" "frontend-webserver" {
    # using standard ami and instance type defined in parameters
    ami           = var.ami_id
    instance_type = var.instance_type

    # using the public subnet
    subnet_id     = module.vpc.subnet_public_id

    # predefined key for terraform in AWS
    key_name      = "terraform-key"
    vpc_security_group_ids = [ aws_security_group.ec2-sg.id ]
    associate_public_ip_address = true

    # Assigning name tag
    tags = {
        Name = "frontend-webserver"
    }

    # declaring dependencies
    depends_on = [ module.vpc.vpc_id, module.vpc.igw_id, aws_instance.backend-webserver]

    # shell script to be run after initializing the server
    /*
        This shell script will setup the server for running frontend service.
        It will dynamically configure the frontend server to connect it to backend server on another server.
        This will run the frontend server on this server.
    */
    user_data = <<EOF
#!/bin/sh
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install --yes nodejs
sudo apt install npm -y
sudo npm install -g n
sudo npm i -g npx
mkdir project
cd project
git clone https://github.com/het-patel99/Recipe_Recommender.git
cd Recipe_Recommender/Code/frontend
sudo sed -i 's/##serverIp##/${aws_instance.backend-webserver.public_ip}:5000/g' /project/Recipe_Recommender/Code/frontend/src/apis/recipeDB.js
npm install
npm start
EOF
}
# describing the security group for ec2 instances
resource "aws_security_group" "ec2-sg" {
  name        = "security-group"
  description = "allow inbound access to the EC2 instance"

  # using the vpc created earlier for this security group
  vpc_id      = module.vpc.vpc_id

  # allowing all inbound and outbound traffic for ec2 instances.
  ingress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = [ "0.0.0.0/0" ]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}
