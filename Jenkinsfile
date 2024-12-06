pipeline {
    agent any

    environment {
        // Define the Node.js version (use the one installed on Jenkins)
        NODEJS_VERSION = 'nodejs-22.11.0' // Replace with the NodeJS installation name in Jenkins
    }

    stages {
        stage('Setup Node.js') {
            steps {
                script {
                    // Set up Node.js using the Node.js plugin
                    def nodejs = tool name: "${NODEJS_VERSION}", type: 'NodeJS'
                    env.PATH = "${nodejs}/bin:${env.PATH}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies using npm
                sh 'npm install'
            }
        }

        stage('Run Server') {
            steps {
                // Run the Node.js server
                sh 'node server.js'
            }
        }
    }

    post {
        always {
            echo 'Pipeline complete.'
        }
    }
}
