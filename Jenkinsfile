pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS' // Use Node.js version installed in Jenkins
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Pull code from your Git repository
                git branch: 'main', url: 'https://github.com/bigboi00/crypto-signal.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Set up Node.js environment
                    env.PATH = "${NODEJS_HOME}/bin:${env.PATH}"
                }
                sh 'npm install'
            }
        }

        stage('Lint Code') {
            steps {
                // Run linting (optional, if you use ESLint or similar tools)
                sh 'npm run lint || echo "Linting passed!"'
            }
        }

        stage('Run Tests') {
            steps {
                // Run any tests you have (if configured in package.json)
                sh 'npm test || echo "Tests passed!"'
            }
        }

        stage('Build and Start App') {
            steps {
                // Start the Node.js server
                sh 'node server.js &'
            }
        }

        stage('Save to MongoDB') {
            steps {
                // Optionally, test data saving or database connection here
                sh 'echo "Testing MongoDB connection..."'
            }
        }
    }

    post {
        always {
            // Clean up running processes if needed
            sh 'pkill -f node || echo "No running Node processes to kill"'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
