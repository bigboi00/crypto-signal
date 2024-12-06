pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Check out the code from your Git repository
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

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    // Build the Vue.js frontend
                    sh 'npm run build'
                }
            }
        }

        stage('Run Backend and Frontend') {
            steps {
                script {
                    // Start backend and frontend servers in parallel
                    def backend = {
                        dir('backend') {
                            sh 'npm start'
                        }
                    }
                    def frontend = {
                        dir('frontend') {
                            sh 'npm run serve'
                        }
                    }
                    parallel backend: backend, frontend: frontend
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
