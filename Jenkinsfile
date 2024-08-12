pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'viktorvasilev42'
        DOCKER_CREDENTIALS_ID = 'viktor-dockerhub'
    }

    stages {
        stage('Build & Push Docker Images') {
            steps {
                script {
                    // Build the images using docker-compose
                    sh 'docker compose -f docker-compose.yml build'

                    // Tag the images
                    sh "docker tag plumtalks-backend plumtalks-backend:${env.BUILD_NUMBER}"
                    sh "docker tag plumtalks-frontend plumtalks-frontend:${env.BUILD_NUMBER}"

                    // Login to Docker Hub
                    sh "echo ${env.DOCKER_PASSWORD} | docker login -u ${env.DOCKER_REGISTRY} --password-stdin"

                    // Push the images to Docker Hub
                    sh "docker push ${env.DOCKER_REGISTRY}/plumtalks-backend:${env.BUILD_NUMBER}"
                    sh "docker push ${env.DOCKER_REGISTRY}/plumtalks-frontend:${env.BUILD_NUMBER}"
                }
            }
        }
    }
}

