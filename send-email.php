<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    

    //Get all the form data
    $projectTitle = $_POST["project_title"];
    $projectDescription = $_POST["project_description"];
    $projectLocationCountry = $_POST["project_location_country"];
    $projectLocationState = $_POST["project_location_state"];
    $projectBudget = $_POST["project_budget"];
    $hasProjectFile = false;
    
    if(isset($_FILES["project_file"]["name"])) {
        $hasProjectFile = true;
        $projectFileName = $_FILES["project_file"]["name"];
        $projectFileType = $_FILES["project_file"]["type"];
        $projectFileSize = $_FILES["project_file"]["size"];
        $projectFileTempName = $_FILES["project_file"]["tmp_name"];
    }
    

    //Beging building out details of the email

    $sendTo = "zainhansrod786@gmail.com";
    $subject = "New project form submission received";

    $message = "Project Title: " . $projectTitle . "\n";
    $message .= "Project Description: " . $projectDescription . "\n\n";
    $message .= "Project Location: " . $projectLocationCountry . ", " . $projectLocationState . "\n";
    $message .= "Project Budget: " . $projectBudget . "\n\n";
    
    if($hasProjectFile) {
        $message .= "File Uploaded: Yes \n";
        $message .= "File Name: " . $projectFileName . "\n";
        $message .= "File Type: " . $projectFileType . "\n";
        $message .= "File Size: " . $projectFileSize . "\n";
        $message .= "Stored In: " . $projectFileTempName . "\n";
    } else {
        $message .= "File Uploaded: No";
    }

    $headers = "From: admin@zainhansrod.com";

    //Send

    if (mail($sendTo, $subject, $message, $headers)) {
        echo "Thank you! Success";
    } else {
        echo "Unsuccessful";
    }
}
