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

namespace ZacharySeguin\RadioReference;

// Data classes
require_once 'AuthInfo.class.php';

error_reporting(E_ERROR);

/*
   RadioReference

   RadioReference API.
*/
class RadioReference
{
   private $auth;
   private $soap;

   private $tags = array();
   private $modes = array();

   /*
      RadioReference(auth)
         Constructs the RadioReference object.
   */
   public function __construct(AuthInfo $auth)
   {
      $this->auth = $auth;
      $this->soap = new \SoapClient("https://api.radioreference.com/soap2/?wsdl&v=latest", array(
         'exceptions' => false
      ));
   }// End of __construct method

   /*
      __call(method, params)
         Calls the RadioReference API method with params.
   */
   private function call($method, array $params = array())
   {
      try
      {
         $response = json_decode(json_encode($this->soap->__call($method, $params)), true);

         if (isset($response['faultstring'])) {
            return null;
         } else {
            return $response;
         }
      }// End of try
      catch (SoapFault $e)
      {
         return null;
      }// End of catch

      return null;
   }// End of __call method

   public function getCountryInfo($coid)
   {
      return $this->call("getCountryInfo", array($coid, $this->auth));
   }

   public function getStateInfo($stid)
   {
      return $this->call("getStateInfo", array($stid, $this->auth));
   }

   public function getSubcatFreqs($scid)
   {
      return $this->call("getSubcatFreqs", array($scid, $this->auth));
   }

   public function getTag($id)
   {
      if (isset($this->tags[$id]))
      {
         return $this->tags[$id];
      }

      $tag = $this->call("getTag", array($id, $this->auth));
      $this->tags[$id] = $tag;
      return $tag;
   }

   public function getMode($id)
   {
      if (isset($this->modes[$id]))
      {
         return $this->modes[$id];
      }

      $mode = $this->call("getMode", array($id, $this->auth));
      $this->modes[$id] = $mode;
      return $mode;
   }

   public function getCountries()
   {
      return $this->call("getCountryList");
   }

   public function getTrsDetails($sid)
   {
      return $this->call("getTrsDetails", array($sid, $this->auth));
   }

   public function getTrsSites($sid)
   {
      return $this->call("getTrsSites", array($sid, $this->auth));
   }

   public function getTrsTalkgroupCats($sid)
   {
      return $this->call("getTrsTalkgroupCats", array($sid, $this->auth));
   }

   public function getTrsTalkgroups($sid, $tgCid = 0, $tgTag = 0, $tgDec = "")
   {
      return $this->call("getTrsTalkgroups", array($sid, $tgCid, $tgTag, $tgDec, $this->auth));
   }

   public function getAgencyInfo($aid)
   {
      return $this->call("getAgencyInfo", array($aid, $this->auth));
   }

   public function getUserInfo()
   {
      return $this->call("getUserData", array($this->auth));
   }

   /*
      getCountyInfo(ctid)
         Gets info for the county with ID ctid.
   */
   public function getCountyInfo($ctid)
   {
      return $this->call("getCountyInfo", array($ctid, $this->auth));
   }// End of getCountyInfo method
}; // End of AuthInfo class
