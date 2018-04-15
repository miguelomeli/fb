<?php


$fb = new Facebook\Facebook([
  'app_id' => '348573342328652', // Replace {app-id} with your app id
  'app_secret' => '0c063a73b6f39e56d54300a145f14559',
  'default_graph_version' => 'v2.12',
  ]);

$helper = $fb->getRedirectLoginHelper();

$permissions = ['email']; // Optional permissions
$loginUrl = $helper->getLoginUrl('https://example.com/fb-callback.php', $permissions);

echo '<a href="' . htmlspecialchars($loginUrl) . '">Log in with Facebook!</a>';