<?php

/*
   The MIT License (MIT)

   Copyright (c) 2014 Zachary Seguin

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   THE SOFTWARE.
*/

/* INCLUDE CLASSES */
require 'classes/RadioReference.class.php';
use ZacharySeguin\RadioReference\RadioReference;
use ZacharySeguin\RadioReference\AuthInfo;

/* DEFINE FUNCTIONS */

$params = json_decode(file_get_contents("php://input"), true);

/*
   get_required_param(param) Gets a required paramater. If it is not provided,
            a 400 'Bad Request' error is returned.
 */
function get_required_param($param)
{
   global $params;

   if (empty($params[$param]))
   {
      header('HTTP/1.0 400 Bad Request');
      die('Invalid Request - Missing "' . $param . '"');
   }

   return $params[$param];
}// End of get_required_param function

/*
   get_optional_param(param, default) Gets an optional paramater. If it is not provided,
            default is returned.
 */
function get_optional_param($param, $default = '')
{
   global $params;

   if (empty($params[$param]))
      return $default;

   return $params[$param];
}// End of get_optional_param function

/* PROCESS API REQUEST */

$request = get_required_param('request');
if ($request === 'error') {
   header('HTTP/1.0 403 Permission Denied');
   die();
}

$rr = new RadioReference(new AuthInfo("98043288", get_required_param('username'), get_required_param('password')));

switch($request)
{
   case 'countries':
      echo json_encode($rr->getCountries());
      break;

   case 'country':
      $coid = (int)get_required_param('coid');
      echo json_encode($rr->getCountryInfo($coid));
      break;

   case 'state':
      $stid = (int)get_required_param('stid');
      echo json_encode($rr->getStateInfo($stid));
      break;

   case 'county':
      $ctid = (int)get_required_param('ctid');
      echo json_encode($rr->getCountyInfo($ctid));
      break;

   case 'subcatFrequencies':
      $scid = (int)get_required_param('scid');
      echo json_encode($rr->getSubcatFreqs($scid));
      break;

   case 'system':
      $sid = (int)get_required_param('sid');
      echo json_encode($rr->getTrsDetails($sid));
      break;

   case 'systemSites':
      $sid = (int)get_required_param('sid');
      echo json_encode($rr->getTrsSites($sid));
      break;

   case 'systemTalkgroupCategories':
      $sid = (int)get_required_param('sid');
      echo json_encode($rr->getTrsTalkgroupCats($sid));
      break;

   case 'systemTalkgroups':
      $sid = (int)get_required_param('sid');
      $tgCid = (int)get_optional_param('tgCid', 0);
      echo json_encode($rr->getTrsTalkgroups($sid, $tgCid));
      break;

   case 'agency':
      $aid = (int)get_required_param('aid');
      echo json_encode($rr->getAgencyInfo($aid));
      break;

   case 'user':
      $response = $rr->getUserInfo();

      if ($response == null) {
         header('HTTP/1.0 403 Permission Denied');
         die();
      }

      echo json_encode($response);
      break;

   default:
      header('HTTP/1.0 400 Bad Request');
      die();
      break;
}
