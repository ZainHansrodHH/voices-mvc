<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    //Get all the form data
    $projectTitle = $_POST["project_title"];
    $projectDescription = $_POST["project_description"];
    $projectLocationCountry = $_POST["project_location_country"];
    $projectLocationState = $_POST["project_location_state"];
    $projectBudget = $_POST["project_budget"];

    //Beging building out details of the email

    $sendTo = "zainhansrod786@gmail.com";
    $subject = "New project form submission received";

    $message = "Project Title: " . $projectTitle . "\n";
    $message .= "Project Description: " . $projectDescription . "\n";
    $message .= "Project Location: " . $projectLocationCountry . ", " . $projectLocationState . "\n";
    $message .= "Project Budget: " . $projectBudget . "\n";

    $headers = "From: admin@zainhansrod.com";

    //Send

    if (mail($sendTo, $subject, $message, $headers)) {
        echo "Thank you! Success";
    } else {
        echo "Unsuccessful";
    }
}
