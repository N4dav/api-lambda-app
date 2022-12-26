pipeline {
    agent {
        label 'agent3'
    }
    stages {
        stage('Create S3 bucket and upload app') {
            steps {
                    git credentialsId: 'GH-NAD', branch: 'main', url: 'https://github.com/N4dav/api-lambda-app.git'
                    sh 'terraform init'
                    sh 'terraform apply -auto-approve -var "bucket_name=api-lambda-app" main.tf'
                    sh 'cd api-lambda-app'
                    sh 'zip -r api-lambda-app.zip .'
                    sh 'aws s3 cp api-lambda-app.zip s3://api-lambda-app/api-lambda-app.zip'
                }
            }
        stage('Build Docker Image') {
            steps {
                sh 'aws s3 cp s3://api-lambda-app/api-lambda-app.zip .'
                sh 'unzip api-lambda-app.zip'
                sh 'cd api-lambda-app'
                sh 'docker build -t api-lambda-app .'
            }
        }
        stage('Create API Gateway') {
            steps {
                sh 'terraform init'
                sh 'terraform apply -auto-approve -var "app_image=api-lambda-app"'
            }
        }
    }
}

