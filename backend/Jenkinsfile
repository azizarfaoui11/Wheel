pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials' // ID des credentials dans Jenkins
        DOCKER_HUB_USERNAME = 'salah070'
       // DOCKER_HUB_REPO_FRONTEND = 'salah070/react'
        DOCKER_HUB_REPO_BACKEND = 'salah070/node'
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/azizarfaoui11/nodejs.git'
            }
        }

        /*stage('Build Frontend Image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_HUB_REPO_FRONTEND:$IMAGE_TAG ./frontend"
                }
            }
        }*/

        stage('Build Backend Image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_HUB_REPO_BACKEND:$IMAGE_TAG ."
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    }
                }
            }
        }

        /*stage('Push Frontend Image') {
            steps {
                script {
                    sh "docker push $DOCKER_HUB_REPO_FRONTEND:$IMAGE_TAG"
                }
            }
        }*/

        stage('Push Backend Image') {
            steps {
                script {
                    sh "docker push $DOCKER_HUB_REPO_BACKEND:$IMAGE_TAG"
                }
            }
        }

        stage('Cleanup') {
            steps {
               // sh "docker rmi $DOCKER_HUB_REPO_FRONTEND:$IMAGE_TAG"
                sh "docker rmi $DOCKER_HUB_REPO_BACKEND:$IMAGE_TAG"
            }
        }
    }
}
