pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        ECR_FRONTEND = 'three-tier-frontend'
        ECR_BACKEND = 'three-tier-backend'
        ECS_CLUSTER = 'three-tier-cluster-new'
        FRONTEND_SERVICE = 'three-tier-frontend-service-3'
        BACKEND_SERVICE = 'three-tier-backend-service'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t $ECR_BACKEND ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t $ECR_FRONTEND ./frontend'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    aws ecs update-service \
                      --region $AWS_REGION \
                      --cluster $ECS_CLUSTER \
                      --service $BACKEND_SERVICE \
                      --force-new-deployment

                    aws ecs update-service \
                      --region $AWS_REGION \
                      --cluster $ECS_CLUSTER \
                      --service $FRONTEND_SERVICE \
                      --force-new-deployment
                '''
            }
        }
    }

    post {
        success {
            echo 'Three-tier application deployment completed successfully.'
        }

        failure {
            echo 'Deployment failed. Check the Jenkins build logs.'
        }
    }
}