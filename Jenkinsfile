pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }

        stage('Navigate to Backend') {
            steps {
                echo 'Navigating to backend directory...'
                dir('backend') {
                    echo 'Now in backend directory.'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Lint') {
            steps {
                echo 'Running ESLint...'
                dir('backend') {
                    sh 'npm run lint'
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                dir('backend') {
                    sh 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                echo 'Building project (if applicable)...'
                dir('backend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Start Server') {
            steps {
                echo 'Starting server...'
                dir('backend') {
                    sh 'node server.js'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for errors.'
        }
    }
}
