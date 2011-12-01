machine = {
  wheels: [
    {
      value: 0,
      shift: function() {
        return this.value;
      },
      process: function(num) {
        return num + this.shift();
      },
      reverse: function(num) {
        return num - this.shift();
      }
    },
    {
      value: 0,
      shift: function() {
        return this.value * 2
      },
      process: function(num) {
        return num - this.shift();
      },

      reverse: function(num) {
        return num + this.shift();
      }
    }
  ],
  specialWheel: {
    shift: function(index, string, previousLetter) {
      
      var shift = 0;
      if (index > 0) {
        
        if (previousLetter === undefined) {
          previousLetter = string[index-1];
        }
                
        shift = $.inArray(previousLetter, machine.key) * 2; 
      }
      
      return shift;
    },
    process: function(num, index, string) {     
      return num + this.shift(index, string);
    },
    reverse: function(num, index, string, stringSoFar) {
      return num - this.shift(index, string, stringSoFar[index-1]);
    },
  },
  process: function(decode, char, int, string, stringSoFar) {
    this.stringSoFar = "";
    // recursive for strings
    if (char.length > 1) {
      var str = "";
      for (var i = 0; i < char.length; i++) {
        str += this.process(decode, char[i], i, char, str); 
      }
      return str;
    } else {
      if (!string) {
        string = char;
        int = 0;
        stringSoFar = "";
      }
    }
    
    // where in the key is this char
    var index = $.inArray(char, this.key);
      
    // for each wheel
    for (i in this.wheels) {
    
      if (decode) {
        index = this.wheels[i].reverse(index, int, string, stringSoFar);
      } else {
        index = this.wheels[i].process(index, int, string, stringSoFar);
      }
    }
      
    // check less than 0  
    while (index < 0) {
      index += this.key.length;
    }
    
    // check more than length
    while (index >= this.key.length) {
      index -= this.key.length;
    }
          
    return this.key[index];
  },
  encode: function(char, int, string) {
    return this.process(false,char,int,string);
  },
  decode: function(char, int, string) {
    return this.process(true,char,int,string);
  },
  key: [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    ".", ",", "?", "!", "'", "\"", " "
  ],
  setWheels: function(wheels) {
    for (var i = 0;i<wheels.length;i++) { 
      if (this.wheels[i] === undefined) {
        this.wheels[i] = wheels[i];
      }
     
      if (typeof wheels[i] === "object") {
        for (j in wheels[i]) {
          this.wheels[i][j] = wheels[i][j];
        }
      } else {
        this.wheels[i].value = wheels[i];
      }
    }
    if (wheels.length <= 2) {
      delete this.wheels[2];
    } else {
      this.wheels[2] = machine.specialWheel;
    }
    if (wheels.length <= 1) {
      this.wheels[1].value = 0;
    }
    
    
  }

}
