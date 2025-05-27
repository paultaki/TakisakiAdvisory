<?php
/**
 * Fallback Subscription Handler
 * Simple PHP script to handle subscriptions when the main API fails
 */

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Simple email validation
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Get email from query parameters
$email = isset($_GET['email']) ? trim($_GET['email']) : '';

// Validate email
if (empty($email) || !isValidEmail($email)) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Path to subscribers file
$subscribersFile = __DIR__ . '/data/subscribers.json';

// Create data directory if it doesn't exist
if (!is_dir(__DIR__ . '/data')) {
    mkdir(__DIR__ . '/data', 0755, true);
}

// Load existing subscribers
$subscribers = [];
if (file_exists($subscribersFile)) {
    $fileContent = file_get_contents($subscribersFile);
    if ($fileContent !== false) {
        $subscribers = json_decode($fileContent, true);
    }
    
    // If the file exists but is empty or not valid JSON, initialize it
    if ($subscribers === null) {
        $subscribers = [];
    }
} else {
    // Create an empty subscribers file
    file_put_contents($subscribersFile, '[]');
}

// Check if already subscribed
$alreadySubscribed = false;
foreach ($subscribers as $subscriber) {
    if (isset($subscriber['email']) && strtolower($subscriber['email']) === strtolower($email)) {
        $alreadySubscribed = true;
        break;
    }
}

if ($alreadySubscribed) {
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Already subscribed!']);
    exit;
}

// Add new subscriber
$subscribers[] = [
    'email' => $email,
    'date' => date('c'), // ISO 8601 date
    'source' => 'fallback'
];

// Save updated subscribers list
if (file_put_contents($subscribersFile, json_encode($subscribers, JSON_PRETTY_PRINT))) {
    // Success
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Subscribed successfully', 'email' => $email]);
} else {
    // Error saving
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Failed to save subscription']);
}