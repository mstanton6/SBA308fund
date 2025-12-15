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
    },
    {
        learner_id: 140,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    }
];
function get_adjusted_score(assignment_id) {

    // This function takes the assignment_id as an input and passes back assignment due date,
    // and the possible points for the assignment.

    let due;
    let points;

    // Error checking for the AssignmentGroup belonging to its course
    if (AssignmentGroup.course_id != CourseInfo.id) {
        throw new Error('The Assignment Group: ' + AssignmentGroup.course_id + ' does not belong to its course ' + thecourseid + '.');
    }

    // Loop through till you get to the the correct assignment
    for (let property of AssignmentGroup.assignments) {

        if (assignment_id == property.id) {
            // console.log('Assignment Group: ' + property.name + ' ' + property.due_at + ' ' + property.points_possible); 
            due = property.due_at;
            points = property.points_possible;
            break;
        }
    }
    return [due, points];

}

function get_late_fee(submitted_at, due_at, possible) {

    // This function will return the late "fee" of points if the assignment is late
    // The late fee is 10% of the points possible
    // Otherwise, if it is not late, it will return 0.

    let subdate = "";
    let duedate = "";
    let latepoints = 0;
    const late = .1;

    subdate = new Date(submitted_at);
    duedate = new Date(due_at);

    if (subdate > duedate) {
        latepoints = late * possible;
    }

    return latepoints;
}

function is_assignment_due_too_far(due_at) {

    // This function will return if an assignment date is too far out - if so, it will return true.
    // Otherwise, it will return false.

    // Get the year portion of the due year in number format
    const due_year = Number(due_at.slice(0, 4));

    // Get the year portion of the current year in number format
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    if (due_year > currentYear) {
        return true
    } else {
        return false;
    }

}



function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.

    try {
        let tally = [];
        let currentid;
        let scores = [];
        let possscores = [];
        let totscores = 0;
        let totpossscores = 0;
        let line2outscores = "";
        let line2outposs = "";
        let line3out = [];
        let count = 0;
        let i = 0;
        let submittedat = "";
        let assignment_is_due = false;

        if (!line3out[i]) {
            line3out[i] = [];
        }

        for (let property of LearnerSubmissions) {
            if (count == 0) {
                currentid = property.learner_id;
            }

            if (currentid !== property.learner_id) {
                // console.log(`Changing learner id's`);

                // ************************************************
                // The learner just changed, so write out their data
                console.log('id: ' + currentid + ',');    // line 1
                //  avg: 0.985, // (47 + 150) / (50 + 150)
                line2outscores = "("
                line2outposs = "("
               // line3out.length = 0;                

                for (i = 0; i < scores.length; i++) {
                    // console.log(scores[i]);
                    //  console.log('possscores ' + possscores[i]);
                    line3out[i] = "";
                    totscores += scores[i];
                    totpossscores += possscores[i];
                    line2outscores += String(scores[i]) + ' + ';  // build line 2 output for scores
                    //  line2outscores += String(scores[i]) + ((i == scores.length)) ? "" : " + ";
                    line2outposs += String(possscores[i]) + ' + ';  // build line 2 output for possible scores
                    if (possscores[i] == 0) {  // watch out for divide by 0
                        line3out[i] += String(i + 1) + ': ' + String(0) + ', // ' + String(scores[i]) + " / " + String(possscores[i]);
                    }
                    line3out[i] += String(i + 1) + ': ' + String(Math.round((scores[i] / possscores[i]) * 1000) / 1000) + ', // ' + String(scores[i]) + " / " + String(possscores[i]);

                }
                line2outscores += ") / "
                line2outposs += ")"

                // console.log('totscores: ' + totscores);
                // console.log('totpossscores: ' + totpossscores);
                // line 2
                if (totpossscores == 0) { // check for divide by 0
                    console.log('avg: ' + (0) + ', // ' + line2outscores + line2outposs);
                } else {
                    console.log('avg: ' + (totscores / totpossscores) + ', // ' + line2outscores + line2outposs);
                }
                // line 3
                // 1: 0.94, // 47 / 50
                //Line 3 -- loop thru for line3out
                for (i = 0; i < scores.length; i++) {
                    console.log(line3out[i]);
                }
                console.log(''); // line between students on the output

                // Now reset
                i = 0;


                // console.log('scores ' + scores);
                //scores = [];
                scores.length = 0


                // console.log('possscores ' + possscores);
                // possscores = [];

                submittedat = property.submission.submitted_at
                // determine if late

                //  console.log('submitted at ' + submittedat + ' due ' + due);
                let [due, poss] = get_adjusted_score(property.assignment_id);
                let late_fee = get_late_fee(submittedat, due, poss);
                assignment_is_due = is_assignment_due_too_far(due);
                if (assignment_is_due == true) {
                    // skip the current learner's assignment, because the due date is too far out
                    continue;
                }
                // if (assignment_is_due == true) {
                //     console.log('assignment_is_due is too far out ' + assignment_is_due);
                // }
                // console.log('The late fee is: ' + late_fee);
                possscores.length = 0;
                possscores[i] = poss;

                scores[i] = property.submission.score - late_fee;
                // reset variables
                totscores = 0;
                totpossscores = 0;
                tally.push([]);


            } else {

                //  scores[i] = property.submission.score;
                submittedat = property.submission.submitted_at
                // determine if late
                // console.log('submitted at ' + submittedat + ' due ' + due);
                let [due, poss] = get_adjusted_score(property.assignment_id);
                let late_fee = get_late_fee(submittedat, due, poss);
                assignment_is_due = is_assignment_due_too_far(due);
                if (assignment_is_due == true) {
                    // skip the current learner's assignment, because the due date is too far out
                    continue;
                }
                //     console.log('assignment_is_due is too far out ' + assignment_is_due);
                // }
                // console.log('The late fee is: ' + late_fee);

                possscores[i] = poss;
                scores[i] = property.submission.score - late_fee;

            }


            i++;
            count += 1;
            currentid = property.learner_id;  // reset current learner id
        }

    }
    catch (err) {
        console.error(err);
    }


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

