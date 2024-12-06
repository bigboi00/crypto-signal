pipeline {
  agent any

  tools {nodejs "nodejs"}


  
  stages { 
      stage('Verify Node and npm') {
    steps {
      sh 'node -v && npm -v'
    }
  }
    stage('Install dependencies') {
      steps {
        sh 'npm install express mongoose cors dotenv body-parser'
      }
    }     
    stage('Test') {
      steps {
         sh 'node server.js'
      }
    }             
  }
}
