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

                    withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                        
                        // Push the images to Docker Hub
                        sh "docker push ${DOCKER_USERNAME}/plumtalks-backend:1.0"
                        sh "docker push ${DOCKER_USERNAME}/plumtalks-frontend:1.0"
                    }
                }
            }
        }
    }
}

