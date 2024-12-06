pipeline {
    agent {
        // Use Docker as the agent
        docker {
            image 'node:18' // Node.js Docker image
            args '-v /var/run/docker.sock:/var/run/docker.sock' // Mount Docker socket for container builds
        }
    }
    environment {
        NODE_ENV = 'production' // Set environment variable
        BACKEND_DIR = 'backend' // Backend folder name
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    // Checkout the repository
                    checkout scm
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    dir(env.BACKEND_DIR) {
                        sh 'npm install' // Install Node.js dependencies
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    dir(env.BACKEND_DIR) {
                        sh 'npm test' // Run tests (make sure tests are defined in package.json)
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dir(env.BACKEND_DIR) {
                        sh 'docker build -t backend-app:latest .' // Build the Docker image
                    }
                }
            }
        }

        stage('Run Server in Docker') {
            steps {
                script {
                    sh 'docker run -d -p 3000:3000 --name backend-app backend-app:latest' // Run the container
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'Application deployed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
        cleanup {
            // Clean up running Docker containers
            sh 'docker stop backend-app || true && docker rm backend-app || true'
        }
    }
}
