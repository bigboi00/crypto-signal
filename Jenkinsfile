pipeline {
  agent any

  tools {nodejs "nodejs"}

  stages {       
    stage('Install dependencies') {
      steps {
        sh 'npm i -save express'
      }
    }     
    stage('Test') {
      steps {
         sh 'node server.js'
      }
    }             
  }
}
