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
                 
               }
        }

        
    
        }    
           
}
