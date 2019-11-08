def testpass = false; 
def dockerRun = 'sudo docker run -p 80:4000 -d -name app jorged104/appanalisis';

pipeline {
  agent any
    
  tools {nodejs "node"}
  
  environment {
       testing = false
   }
   
  stages {
      
      
        
    stage('Cloning Git') {
      steps {
       git branch: 'develop', url: 'https://github.com/jorged104/Twitter-Docker'
      }
    }
    
        stage('Contenedores de prueba') {
          steps {
                echo '+++++++++ Instalando dependencias  +++++' 
                 dir('API') {
                      sh "docker build . -t jorged104/apiserver:latest"
                 }
                 dir('FRONT')
                 {
                    sh "docker build . -t jorged104/front:latest"
                 }
                sh "docker-compose down "
                sh "docker-compose up -d "
                dir('Test')
                {
                  sh "npm install"
                  sh "npm start"
                }
               }
        }
     stage('Test') {
          steps {
              dir('Test') { 
                 sh 'npm test'
                 junit 'test-reports.xml'
              }
           }
            post {
                success {
                  script
                  {
                      testpass = true;
                  }
                }
            }
        }
         stage('docker push Images ') {
              when {
                    expression { 
                        return testpass
                    }
                }
          steps {
               withCredentials([string(credentialsId: 'docker-pwd', variable: 'dockerhub')]) {
                            sh 'docker login -u jorged104 -p ${dockerhub}'
                             sh 'docker push jorged104/apiserver:latest'
                              sh 'docker push jorged104/front:latest'
                   }
                  
                   
               }
        }
        stage('Despliegue') {
             
              when {
                    expression { 
                        return testpass
                    }
                }
          steps {
                  withCredentials([string(credentialsId: 'dani', variable: 'daniel')]) {
                     sh 'fab -p ${daniel} pull '
                     sh 'fab -p ${daniel} install'
                  }

               }
        } 
        
    
  }    
           
}
