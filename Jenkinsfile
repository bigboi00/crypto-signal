pipeline {
    agent any

    tools {
        nodejs "nodejs" // Match the NodeJS version configured in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies for both backend and frontend
                dir('backend') {
                    sh 'npm install'
                }
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }


        stage('Run Backend and Frontend') {
            steps {
                script {
                    // Define backend and frontend processes
                    def backend = {
                        dir('backend') {
                            sh 'node server.js'
                        }
                    }
                    // Run both in parallel
                    parallel backend: backend
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution complete!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
