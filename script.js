// SBA objects - starter code
/* Instructions
You will create a script that gathers data, processes it, and then outputs a consistent result as described by a specification. This is a very typical situation in industry, and this particular scenario has been modified from a real application. The data you will use is provided below.
You will be provided with four different types of data: CourseInfo, AssignmentGroup, LearnerSubmissions, 
*/

// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];
function get_adjusted_score(assignment_id, submitted_at, score) {
    return score - 10;  // just a place holder for now
}

function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.

    try {


        let adj_score;
        let tally = [];
        let i = 0;
        let j = 0;
        let changedlearners = false;
        let currentid = LearnerSubmissions.learner_id;
        let scores = [];
        let possscores = [];

        for (let property of LearnerSubmissions) {

            if (currentid !== property.learner_id) {
                console.log(`Changing learner id's`);
                currentid = property.learner_id;  // reset current learner id
                tally.push([]);
                changedlearners = true;
                console.log('scores ' +scores);
                scores = [];
                scores[i] = property.submission.score;
                
                possscores[i] = 150;
                console.log('possscores ' + possscores);

            } else {
                changedlearners = false;
                scores[i] = property.submission.score;
                possscores[i] = 150;
            }

            console.log(property.learner_id, property.assignment_id, property.submission.submitted_at, property.submission.score);

            adj_score = get_adjusted_score(property.assignment_id, property.submission.submitted_at, property.submission.score);

           // console.log('adj_score: ' + adj_score);

          //  if (i == 0 || changedlearners == true) {
                tally.push([property.learner_id, property.submission.score, property.submission.submitted_at])
          //  }
          //  else {
          //      tally.push([property.submission.score, property.submission.submitted_at]);
           // }

            i++;
        }

        console.log('Last student scores ' +scores);

        console.log('tally: ' + tally);

        console.log('tally loop');

        for (let i = 0; i < tally.length; i++) {
            console.log(tally[i]);
        }

    }
    catch (err) {
        console.error(err);
    }


    // console.log(totals)

    // console.log('Neh start');

    // for (let property in LearnerSubmissions) {
    //     if (typeof property == "object") {
    //         for (let property2 in property) {
    //             console.log(obj[property][property2])
    //         }
    //     } else {
    //         console.log(LearnerSubmissions[property])
    //     }

    // }


    // What the results should be
    /*const result = [
      {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
      },
      {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
      }
        
    ];  */

    return; // result
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

//console.log(result);

