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
                sh 'pip3 install -r requirements.txt || true'
            }
        }

        stage('Run App') {
            steps {
                sh '''
                pkill -f app.py || true
                nohup python3 app.py > app.log 2>&1 &
                '''
            }
        }
    }
}