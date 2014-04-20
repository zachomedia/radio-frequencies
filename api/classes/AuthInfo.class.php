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

/*
   AuthInfo

   Authentication information required by the RadioReference API.
      NOTE: username and password should NOT be harcoded as must
               be provided by the user (See RadioReference API for info).
*/
class AuthInfo
{
   public $username;
   public $password;
   public $appKey;
   public $version;
   public $style;

   /*
      AuthInfo(appKey, username, password, version, style)
         Constructs the AuthInfo object.
   */
   public function __construct($appKey, $username, $password, $version = "latest", $style = "rpc")
   {
      $this->username = $username;
      $this->password = $password;
      $this->appKey = $appKey;
      $this->version = $version;
      $this->style = $style;
   }// End of __construct method
}; // End of AuthInfo class
