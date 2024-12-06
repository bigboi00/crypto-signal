pipeline {
    agent any

    tools {
        nodejs 'nodejs' // Ensure this matches the NodeJS tool name configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Package') {
            steps {
                sh 'npm run package'
            }
        }
    }

    post {
        always {
            script {
                // Wrap workspace cleanup in a node block
                node {
                    cleanWs()
                }
            }
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
