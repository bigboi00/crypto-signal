pipeline {
  agent any

  tools {nodejs "nodejs"}

  stages {       
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
