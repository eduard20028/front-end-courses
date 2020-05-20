function Student(studName, studEmail){
    let homeworkResults = [],
        name = studName,
        email = studEmail;
    this.getName = () => {
        return name;
    }
    this.getEmail = () => {
        return email;
    }
    this.addHomeworkResult = (topic, success) => {
        homeworkResults.push({
            topic: topic,
            success: success
        })
    }
    this.getHomeworkResult = () => {
        return homeworkResults;
    }
}

function FrontendLab(students, failsLim){
    let failedHomeworksLimit = failsLim,
        studentsList = students.map(stud => new Student(stud.name, stud.email));
    
    this.printStudentsList = () => {
        studentsList.forEach(stud => {
            console.log('name: ' + stud.getName() + ', email: ' + stud.getEmail());
            console.log(stud.getHomeworkResult());
        })
    }
    this.addHomeworkResults = ({topic, results}) => {
        studentsList.forEach(stud => {
            let homeworkResult = results.find(res => {
                return stud.getEmail() === res.email;
            });  
            stud.addHomeworkResult(topic, homeworkResult.success);
        })
    }
    this.printStudentsEligibleForTest = () => {
        studentsList.forEach(stud => {
            let failCounter = 0;
            stud.getHomeworkResult().forEach(res => {
                res.success ? failCounter : failCounter++;
            })
            if(failCounter <= failedHomeworksLimit){
                console.log('name: ' + stud.getName() + ', email: ' + stud.getEmail());
            }
        })
    }
}