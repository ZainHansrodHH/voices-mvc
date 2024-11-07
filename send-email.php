<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    

    //Get all the form data & validate it

    $isValid = true;

    if(isset($_POST["project_title"]) AND $_POST["project_title"] != "") {
        $projectTitle = $_POST["project_title"];
    } else {
        $isValid = false;
    }


    if(isset($_POST["project_location_country"]) AND $_POST["project_location_country"] != "") {
        $projectLocationCountry = $_POST["project_location_country"];
    } else {
        $isValid = false;
    }

    if(isset($_POST["project_location_state"]) AND $_POST["project_location_state"] != "") {
        $projectLocationState = $_POST["project_location_state"];
    } else {
        $isValid = false;
    }

    $projectDescription = $_POST["project_description"];
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

    //Send our email out

    if (mail($sendTo, $subject, $message, $headers)) {
        $url = "https://www.zainhansrod.com/voices?success=true";
    } else {
        $url = "https://www.zainhansrod.com/voices?success=false";
    }
    header('Location: '.$url);
} else {

    //Send the user back to the homepage if the form is not submitted
    $url = "https://www.zainhansrod.com/voices";
    header('Location: '.$url);
    die();
}
