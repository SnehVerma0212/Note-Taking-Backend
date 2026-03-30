pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/SnehVerma0212/Note-Taking-Backend'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Server') {
            steps {
                sh '''
                pkill -f node || true
                nohup node server.js > app.log 2>&1 &
                '''
            }
        }
    }
}