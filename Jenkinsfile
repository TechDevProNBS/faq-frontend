pipeline {
    agent any

    stages {
        stage('Testing FAQS Node Frontend') {
            steps {
		    echo "Testing"
            }
        }
        stage('Building FAQS Node Frontend') {
            steps {
                    sh 'npm start'
		    sh 'docker build -t="rakimsv/faqs-frontend:latest" .'
            }
        }
        stage('Staging FAQS Node Frontend') {
            steps {
                   echo "Staging"
            }
        }
        stage('Deploying FAQS Node Frontend') {
            steps {
		   sh 'docker push "rakimsv/faqs-frontend:latest"'
                   echo "Deploying"
            }
        }
        stage('FAQS Node Frontend deployed') {
            steps {
                echo "Project Deployed"
            }
        }
        stage('Running FAQS Node Frontend') {
            steps {
                sh 'docker run "rakimsv/faqs-frontend:latest"'
                echo "Project Running"
            }
        }
    }
}
