test = function() {

  // simple 1 wheel
  machine.setWheels([5]); 
  
  // 1
  testEncode("a","f");
  
  // 2
  testEncode("c","h");       
  
  // 2 wheels 
  machine.setWheels([2,5]); 
  
  // 3
  testEncode("abc","STU");      
  
  // 3 wheels simple
  machine.setWheels([0,0,true]); 
  
  // 4
  testEncode("0","0");
  
  // 5
  testEncode("00","00");
  
  // 6
  testEncode("012","014");
  
  // 7
  testEncode("AAA","AUU");
  
  // 8
  testEncode("ZZ","Za");
  
  // 9
  testEncode("zz","zj");
  

  // 3 wheels tough
  machine.setWheels([4,7,true]); 
  
  // 11
  testEncode("HI","7g"); 
     
  // 12
  testEncode("AAAAAAAAA","0KKKKKKKK");       
  
  
  // decoding
  
  // 1 wheel
  machine.setWheels([5]); 
  
  // 12
  testDecode("a","f");
  
  // 13
  testDecode("c","h");
        
  machine.setWheels([2,5]); 
  
  // 14
  testDecode("abc","STU");      
  
  // 2 wheels simple
  machine.setWheels([0,0,true]); 
  
  // 15
  testDecode("0","0");
  
  // 16
  testDecode("00","00");
  
  // 17
  testDecode("012","014");
  
  // 18
  testDecode("AAA","AUU");
  
  // 19
  testDecode("ZZ","Za");
  
  // 20
  testDecode("zz","zj");
  
  // 3 wheels tough
  machine.setWheels([4,7,true]); 
  
  // 21
  testDecode("HI","7g");       

  // 22
  testDecode("AAAAAAAAA","0KKKKKKKK");       
      
}

testCount = 1;
testEncode = function(toEncode, expected) {
  if (machine.encode(toEncode) !== expected) {
    log("test "+testCount+" failed");
    log(machine.encode(toEncode)+" != "+expected);    
  } else {
    log("test "+testCount+" passed");
  }
  testCount++; 
}
  
testDecode = function(expected,toDecode) {
  if (machine.decode(toDecode) !== expected) {
    log("test "+testCount+" failed");
    log(machine.decode(toDecode)+" != "+expected);    
  } else {
    log("test "+testCount+" passed");
  }
  testCount++; 
} 