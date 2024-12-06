pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    docker.image('node:18').inside {
                        sh 'node --version'
                    }
                }
            }
        }
    }
}
