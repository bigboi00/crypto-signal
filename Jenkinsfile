pipeline {
    agent any
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t crypto-signal .'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker run -d -p 5000:5000 --name crypto-signal-container crypto-signal'
                }
            }
        }
        stage('Wait for Service') {
            steps {
                script {
                    // Wait for the application to respond
                    sh 'until curl -s http://localhost:5000; do sleep 5; done'
                }
            }
        }
    }
}
