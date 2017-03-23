Memory  = "0";
Current = "0";
Operation = 0;
MAXLENGTH = 30;

function AllClear()             //Clear ALL entries!
 { Current = "";
   cal.displaybox.value = Current;
 }
 function AddDigit(dig)          //ADD A DIGIT TO DISPLAY (keep as 'Current')
 { if (Current.indexOf("!") == -1)  //if not already an error
    { if (    (eval(Current) == 0)
              && (Current.indexOf(".") == -1)
         ) { Current = dig;
           } else
           { Current = Current + dig;
           };
      Current = Current.toLowerCase(); //FORCE LOWER CASE
    } else
    { Current = "Hint! Press 'AC'";  //Help out, if error present.
    };
   if (Current.indexOf("e0") != -1)
     { var epos = Current.indexOf("e");
       Current = Current.substring(0,epos+1) + Current.substring(epos+2);
     };
  if (Current.length > MAXLENGTH)
     { Current = "Aargh! Too long"; //don't allow over MAXLENGTH digits before "." ???
     };
   cal.displaybox.value = Current;
 }

 function Dot()                  //PUT IN "." if appropriate.
 {
  if ( Current.length == 0)     //no leading ".", use "0."
    { Current = "0.";
    } else
    {  if ( Current.indexOf(".") == -1)
         { Current = Current + ".";
    };   };
  cal.displaybox.value= Current;
 }

 function FixCurrent()
  {
   Current = cal.displaybox.value;
   Current = "" + parseFloat(Current);
   if (Current.indexOf("NaN") != -1)
     { Current = "Aargh! I don't understand";
     };
   cal.displaybox.value = Current;
  }
  function Operate(op)            //STORE OPERATION e.g. + * / etc.
 {
 if (Operation != 0) { Calculate(); }; //'Press "=" if pending operation!
 // note that design is not good for showing *intermediate* results.

  if (op.indexOf("*") > -1) { Operation = 1; };       //codes for *
  if (op.indexOf("/") > -1) { Operation = 2; };       // slash (divide)
  if (op.indexOf("+") > -1) { Operation = 3; };       // sum
  if (op.indexOf("-") > -1) { Operation = 4; };       // difference

  Memory = Current;                 //store value
  // note how e.g. Current.value gives neither error nor value! ***
  Current = "";
   cal.displaybox.value= Current;
 }
   function Calculate()            //PERFORM CALCULATION (= button)
    {
     if (Operation == 1) { Current = eval(Memory) * eval(Current); };
     if (Operation == 2) { Current = eval(Memory) / eval(Current); };
     if (Operation == 3) { Current = eval(Memory) + eval(Current); };
     if (Operation == 4) { Current = eval(Memory) - eval(Current); };
     Operation = 0;                //clear operation
     Memory    = "0";              //clear memory
     cal.displaybox.value= Current;
    }
