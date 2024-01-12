
  // trek.js 1.0
  // 2011.01.07 11:55:39 AM
  //
  // trek.js is a javascript port of the Star Trek (text game), a text only 
  // video game developed in the 1970s.
  //
  // Original Star Trek .. Mike Mayfield 1971
  // Super Star Trek ..... Bob Leedom 1976
  // curly brace port .... Michael Birken 2008
  // javascript port ..... Eric Friedrichsen 2011
  //
  // For a broad historical context of the Star Trek (text game), see
  // http://en.wikipedia.org/wiki/Star_Trek_(text_game)
  //
  // For a write up of the Michael Birken port, see
  // http://gadgets.boingboing.net/2008/08/04/resurrecting-star-tr.html
  //
  // trek.js is free software.  You can redistribute it and/or modify
  // it under the terms of the GNU Lesser General Public License 
  // (version 3 of the license or later) as published by the Free Software 
  // Foundation.  See http://www.gnu.org/licenses/
  //
  // trek.js is distributed in the hope that it will be useful,
  // but WITHOUT ANY WARRANTY, without even the implied warranty of
  // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  // GNU Lesser General Public License for more details.

  //////////////////////////////////////////////////////////////////////////////
  // class CommandTag  /////////////////////////////////////////////////////////
  function CommandTag (label, output, clear) 
  {
    this.clear = clear;
    this.label = label;
    this.output = output;
  }
  // end of class CommandTag  //////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // class Quadrant  ///////////////////////////////////////////////////////////
  function Quadrant(name,stars)
  {
    this.name = name;
    this.stars = stars;

    this.numberOfKlingonD5s = 0;
    this.numberOfKlingonD6s = 0;
    this.numberOfKlingonD7s = 0;
    this.scanned = false;
    this.starbase = false;

    // Quadrant.addRandomKlingon function declaration - begin
    this.addRandomKlingon = function(scenario)
    {
      var math = new CommonMath();

      switch (scenario)
      {
        case 1:
          this.numberOfKlingonD5s++;
          break;

        case 2:
          if (math.randomNextDouble() < 0.33)
          {
            this.numberOfKlingonD6s++;
          }
          else
          {
            this.numberOfKlingonD5s++;
          }
          break;

        case 3:
          var selection = math.randomNextDouble();
          if (selection < 0.14)
          {
            this.numberOfKlingonD7s++;
          }
          else if (selection < 0.28)
          {
            this.numberOfKlingonD6s++;
          }
          else
          {
            this.numberOfKlingonD5s++;
          }
          break;
      }
    }
    // Quadrant.addRandomKlingon function declaration - end

    // Quadrant.clearKlingons function declaration - begin
    this.clearKlingons = function()
    {
      this.numberOfKlingonD5s = 0;
      this.numberOfKlingonD6s = 0;
      this.numberOfKlingonD7s = 0;
    }
    // Quadrant.clearKlingons function declaration - end

    // Quadrant.getNumberOfKlingons function declaration - begin
    this.getNumberOfKlingons = function()
    {
      return this.numberOfKlingonD5s + this.numberOfKlingonD6s + this.numberOfKlingonD7s;
    }
    // Quadrant.getNumberOfKlingons function declaration - end

    // Quadrant.removeKlingon function declaration - begin
    this.removeKlingon = function(ship)
    {
      if (ship == null)
      {
        return;
      }

      if (ship.classDesignation == "D5" && this.numberOfKlingonD5s > 0)
      {
        this.numberOfKlingonD5s--;
      }
      if (ship.classDesignation == "D6" && this.numberOfKlingonD6s > 0)
      {
        this.numberOfKlingonD6s--;
      }
      if (ship.classDesignation == "D7" && this.numberOfKlingonD7s > 0)
      {
        this.numberOfKlingonD7s--;
      }
    }
    // Quadrant.removeKlingon function declaration - end
  }
  // end of class Quadrant  ////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // class QuadrantGrid  ///////////////////////////////////////////////////////
  // This class was created to support multiple ported languages.  Descendant
  // codebases that no longer support multiple languages should rely on native
  // implementation instead.
  function QuadrantGrid(i, j) 
  {
    this.items = new Array(i);
    for (var iIndex = 0; iIndex < i; iIndex++)
    {
      this.items[iIndex] = new Array(j);
      for (var jIndex = 0; jIndex < j; jIndex++)
      {
        this.items[iIndex][jIndex] = new Quadrant("", 0);
      }
    }

    this.getItem = function(i, j)
    {
      try
      {
        return this.items[i][j];
      }
      catch(err)
      {
        return null;
      }
    }

    this.setItem = function(i, j, item)
    {
      try
      {
        this.items[i][j] = item;
      }
      catch(err)
      {
      }
    }
  }
  // end of class QuadrantGrid  ////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // class Coordinates  ////////////////////////////////////////////////////////
  function Coordinates (i, j) 
  {
    this.i = i;
    this.j = j;
  }
  // end of class Coordinates  /////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // class CoordinatesCollection  //////////////////////////////////////////////
  // This class was created to support multiple ported languages.  Descendant
  // codebases that no longer support multiple languages should rely on native
  // implementation instead.
  function CoordinatesCollection() 
  {
    this.items = new Array();
    
    this.getItem = function(index)
    {
      try
      {
        return this.items[index];
      }
      catch(err)
      {
        return null;
      }
    }

    this.getLength = function()
    {
      return this.items.length;
    }

    this.push = function(item)
    {
      this.items.push(item);
    }

    this.getItems = function()
    {
      return this.items;
    }
  }
  // end of class CoordinatesCollection  ///////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // class KlingonShip  ////////////////////////////////////////////////////////
  function KlingonShip (classDesignation, sectorX, sectorY, shieldLevel) 
  {
    this.classDesignation = classDesignation;
    this.sectorX = sectorX;
    this.sectorY = sectorY;
    this.shieldLevel = shieldLevel;
  }
  // end of class KlingonShip  /////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // class ShipCollection  /////////////////////////////////////////////////////
  // This class was created to support multiple ported languages.  Descendant
  // codebases that no longer support multiple languages should rely on native
  // implementation instead.
  function ShipCollection() 
  {
    this.items = new Array();

    this.clear = function()
    {
      this.items = [];
    }

    this.getItem = function(index)
    {
      try
      {
        return this.items[index];
      }
      catch(err)
      {
        return null;
      }
    }

    this.getItems = function()
    {
      return this.items;
    }

    this.getLength = function()
    {
      return this.items.length;
    }

    this.push = function(item)
    {
      this.items.push(item);
    }

    this.removeIndex = function(index)
    {
      try
      {
        this.items.splice(index, 1);
      }
      catch(err)
      {
      }
    }

    this.removeIndices = function(indices)
    {
      var remove = new Array(this.items.length);
      for (var i = 0; i < this.items.length; i++)
      {
        remove[i] = false;
      }
      
      for (var i = 0; i < indices.length; i++)
      {
        var index = indices[i];
        
        if (index >= 0 && index < remove.length)
        {
          remove[index] = true;
        }
      }
   
      var newList = new Array();
      for (var i = 0; i < this.items.length; i++)
      {
        if (remove[i] == false)
        {
          newList.push(this.items[i]);
        }
      }

      this.items = newList;
    }
  }
  // end of class ShipCollection  //////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // class CommonMath  /////////////////////////////////////////////////////////
  // This class was created to support multiple ported languages.  Descendant
  // codebases that no longer support multiple languages should rely on native
  // implementation instead.
  function CommonMath() 
  {
    this.convertStringToFloat = function(number)
    {
      var numberValue = 0.0;
      try
      {
        numberValue = parseFloat(number);
      }
      catch(err)
      {
        numberValue = 0.0;
      }
      if (isNaN(numberValue))
      {
        numberValue = 0.0;
      }
      return numberValue;
    }

    this.convertFloatToInt = function(number)
    {
      var numberValue = 0;
      try
      {
        numberValue = Math.floor(number);
      }
      catch(err)
      {
        numberValue = 0;
      }
      if (isNaN(numberValue))
      {
        numberValue = 0;
      }
      return numberValue;
    }
   
    this.convertIntToFloat = function(number)
    {
      return number;
    }
   
    this.convertStringToInt = function(number)
    {
      var numberValue = 0;
      try
      {
        numberValue = parseInt(number);
      }
      catch(err)
      {
        numberValue = 0;
      }
      if (isNaN(numberValue))
      {
        numberValue = 0;
      }
      return numberValue;
    }

    this.randomNext = function(maxValue)
    {
      return Math.floor( Math.random() * maxValue );
    }

    this.randomNextDouble = function()
    {
      return Math.random();
    }

    this.pi = function()
    {
      return Math.PI;
    }

    this.cos = function(radians)
    {
      return Math.cos(radians);
    }

    this.sin = function(radians)
    {
      return Math.sin(radians);
    }

    this.round = function(number)
    {
      return Math.round(number);
    }

    this.sqrt = function(number)
    {
      return Math.sqrt(number);
    }

    this.calculateDistance = function(x1, y1, x2, y2)
    {
      var x = x2 - x1;
      var y = y2 - y1;
      return Math.sqrt(x * x + y * y);
    }

    this.calculateDirection = function(x1, y1, x2, y2)
    {
      var direction = 0.0;
      if (x1 == x2)
      {
        if (y1 < y2)
        {
          direction = 7.0;
        }
        else
        {
          direction = 3.0;
        }
      }
      else if (y1 == y2)
      {
        if (x1 < x2)
        {
          direction = 1.0;
        }
        else
        {
          direction = 5.0;
        }
      }
      else
      {
        var dy = Math.abs(y2 - y1);
        var dx = Math.abs(x2 - x1);
        var angle = Math.atan2(dy, dx);
   
        if (x1 < x2)
        {
          if (y1 < y2)
          {
            direction = 9.0 - 4.0 * angle / Math.PI;
          }
          else
          {
            direction = 1.0 + 4.0 * angle / Math.PI;
          }
        }
        else
        {
          if (y1 < y2)
          {
            direction = 5.0 + 4.0 * angle / Math.PI;
          }
          else
          {
            direction = 5.0 - 4.0 * angle / Math.PI;
          }
        }
      }
      return direction;
    }
  }
  // end of class CommonMath  //////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // class IntCollection  //////////////////////////////////////////////////////
  // This class was created to support multiple ported languages.  Descendant
  // codebases that no longer support multiple languages should rely on native
  // implementation instead.
  function IntCollection() 
  {
    this.items = new Array();
    
    this.getItem = function(index)
    {
      try
      {
        return this.items[index];
      }
      catch(err)
      {
        return -1;
      }
    }

    this.getLength = function()
    {
      return this.items.length;
    }

    this.push = function(item)
    {
      this.items.push(item);
    }

    this.getItems = function()
    {
      return this.items;
    }
  }
  // end of class IntCollection  ///////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // class ManagedStringCollection  ////////////////////////////////////////////
  // This class was created to support multiple ported languages.  Descendant
  // codebases that no longer support multiple languages should rely on native
  // implementation instead.
  function ManagedStringCollection() 
  {
    this.items = new Array();

    this.getItems = function()
    {
      return this.items;
    }

    this.getLength = function()
    {
      return this.items.length;
    }

    this.push = function(item)
    {
      this.items.push(item);
    }
   
    this.pushRange = function(newItems)
    {
      if (newItems == null) 
      {
        return;
      }
      this.items = this.items.concat(newItems);
    }

    this.removeFirst = function()
    {
      if (this.items.length < 1)
      {
        return;
      }
      this.items.splice(0,1);
    }

    this.getLastValue = function()
    {
      if (this.items.length < 1)
      {
        return "";
      }
      return this.items[this.items.length - 1];
    }

    this.getHorizontalMerge = function(left, right, margin, minLeftColumnWidth, theme)
    {
      if (left == null)
      {
        left = new Array();
      }
      if (right == null)
      {
        right = new Array();
      }

      var mergedLength = left.length;
      if (mergedLength < right.length)
      {
        mergedLength = right.length;
      }

      var leftColumnWidth = 0;
      for (var i = 0; i < left.length; i++)
      {
        var item = left[i];
      
        if (item != null && leftColumnWidth < item.length)
        {
          leftColumnWidth = item.length;
        }
      }
   
      if (leftColumnWidth < minLeftColumnWidth)
      {
        leftColumnWidth = minLeftColumnWidth;
      }
   
      leftColumnWidth += margin;

      var lines = new Array();
      for (var index = 0; index < mergedLength; index++)
      {
        var leftColumn = "";
        if (index < left.length)
        {
          leftColumn = left[index];
        }
        if (leftColumn == null)
        {
          leftColumn = "";
        }
        
        if (leftColumn.length < leftColumnWidth)
        {
          leftColumn += " ";
        }
        while (leftColumn.length < leftColumnWidth)
        {
          // "c" classic console, "s" suppa text, "p" pre oriented
          if (theme == "s")
          {
            leftColumn += "-";
          }
          else
          {
            leftColumn += " ";
          }
        }
   
        var rightColumn = "";
        if (index < right.length)
        {
          rightColumn = right[index];
        }
        if (rightColumn == null)
        {
          rightColumn = "";
        }
        
        lines.push(leftColumn + rightColumn);
      }

      return lines;
    }
  }
  // end of class ManagedStringCollection  /////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // class StringAccumulator  //////////////////////////////////////////////////
  // This class was created to support multiple ported languages.  Descendant
  // codebases that no longer support multiple languages should rely on native
  // implementation instead.
  function StringAccumulator() 
  {
    this.currentItem = "";
    this.items = new Array();

    this.append = function(fragment)
    {
      this.currentItem += fragment;
    }

    this.appendLine = function(item)
    {
      this.currentItem += item;
      this.items.push(this.currentItem);
      this.currentItem = "";
    }

    this.getItems = function()
    {
      var clone = new Array();
      clone = clone.concat(this.items);

      if (this.currentItem != null && this.currentItem != "")
      {
        clone.push(this.currentItem);
      }

      return clone;
    }
  }
  // end of class StringAccumulator  ///////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // class StringFormatter  ////////////////////////////////////////////////////
  // This class was created to support multiple ported languages.  Descendant
  // codebases that no longer support multiple languages should rely on native
  // implementation instead.
  function StringFormatter() 
  {
    this.toFixed = function(number, decimalPlaces)
    {
      return number.toFixed(decimalPlaces)
    }

    this.format = function(mask, arguments)
    {
      for (var i = 0; i < arguments.length; i++) 
      {
          var regexp = new RegExp('\\{'+i+'\\}', 'gi');
          mask = mask.replace(regexp, arguments[i]);
      }
      return mask;
    }
   
    this.getStanardizedInput = function(userInput)
    {
      if (userInput == null)
      {
        return "";
      }
      userInput = jQuery.trim(userInput).toLowerCase();
      return userInput;
    }
  }
  // end of class StringFormatter  /////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // class StringGrid  /////////////////////////////////////////////////////////
  // This class was created to support multiple ported languages.  Descendant
  // codebases that no longer support multiple languages should rely on native
  // implementation instead.
  function StringGrid(i, j) 
  {
    this.items = new Array(i);
    for (var iIndex = 0; iIndex < i; iIndex++)
    {
      this.items[iIndex] = new Array(j);
      for (var jIndex = 0; jIndex < j; jIndex++)
      {
        this.items[iIndex][jIndex] = "";
      }
    }

    this.clear = function()
    {
      for (var iIndex = 0; iIndex < this.items.length; iIndex++)
      {
        for (var jIndex = 0; jIndex < this.items[iIndex].length; jIndex++)
        {
          this.items[iIndex][jIndex] = "";
        }
      }
    }

    this.getItem = function(i, j)
    {
      try
      {
        return this.items[i][j];
      }
      catch(err)
      {
        return null;
      }
    }

    this.setItem = function(i, j, item)
    {
      try
      {
        this.items[i][j] = item;
      }
      catch(err)
      {
      }
    }
  }
  // end of class StringGrid  //////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // class GameState  //////////////////////////////////////////////////////////
  function GameState()
  {
    this.isScreenGreen = false;
    this.isScreenHighContrast = true;

    var math = new CommonMath();

    this.allQuadrants = new QuadrantGrid(8, 8);
    this.klingonShips = new ShipCollection();

    // "" empty, "s" star, "k" klingon, "e" starship, "b" base
    this.currentSector = new StringGrid(8, 8);

    this.quadrantX = math.randomNext(8);
    this.quadrantY = math.randomNext(8);
    this.sectorX = math.randomNext(8);
    this.sectorY = math.randomNext(8);
    this.numberStarbasesRemaining = 2 + math.randomNext(3);
    this.destroyed = false;
    this.navigationDamage = 0;
    this.shortRangeScanDamage = 0;
    this.longRangeScanDamage = 0;
    this.shieldControlDamage = 0;
    this.computerDamage = 0;
    this.photonDamage = 0;
    this.phaserDamage = 0;
    this.shieldLevel = 0;
    this.docked = false;

    for (var i = 0; i < 8; i++)
    {
      for (var j = 0; j < 8; j++)
      {
        var name = null;
        if (j <= 3)
        {
          switch (i)
          {
            case 0: name = "Antares"; break;
            case 1: name = "Rigel"; break;
            case 2: name = "Procyon"; break;
            case 3: name = "Vega"; break;
            case 4: name = "Canopus"; break;
            case 5: name = "Altair"; break;
            case 6: name = "Sagittarius"; break;
            case 7: name = "Pollux"; break;
          }
        }
        else
        {
          switch (i)
          {
            case 0: name = "Sirius"; break;
            case 1: name = "Deneb"; break;
            case 2: name = "Capella"; break;
            case 3: name = "Betelgeuse"; break;
            case 4: name = "Aldebaran"; break;
            case 5: name = "Regulus"; break;
            case 6: name = "Arcturus"; break;
            case 7: name = "Spica"; break;
          }
        }

        var romanBasis = j;
        if (romanBasis > 3)
        {
          romanBasis -= 4;
        }

        var roman = null;
        switch (romanBasis)
        {
          case 0: roman = "I"; break;
          case 1: roman = "II"; break;
          case 2: roman = "III"; break;
          case 3: roman = "IV"; break;
        }
        name = name + " " + roman;

        var quadrant = new Quadrant(name, 1 + math.randomNext(8));

        this.allQuadrants.setItem(i, j, quadrant);
      }
    }

    this.allStarbaseCoordinates = new CoordinatesCollection();
    var starbaseCount = this.numberStarbasesRemaining;
    while (starbaseCount > 0)
    {
      var i = math.randomNext(8);
      var j = math.randomNext(8);

      var quadrant = this.allQuadrants.getItem(i, j);
      if (null != quadrant)
      {
        if (quadrant.starbase == false)
        {
          quadrant.starbase = true;
          quadrant.scanned = true;
          starbaseCount--;

          this.allStarbaseCoordinates.push(new Coordinates(i, j));
        }
      }
    }

    // GameState.getTheme function declaration - begin
    this.getTheme = function()
    {
      // "c" classic console, "s" suppa text, "p" pre oriented
      return "p";
    }
    // GameState.getTheme function declaration - end

    // GameState.getKlingonShipIndicator function declaration - begin
    this.getKlingonShipIndicator = function()
    {
      // "c" classic console, "s" suppa text, "p" pre oriented
      if (this.getTheme() == "s")
      {
        return "+K+";
      }
      return "+++";
    }
    // GameState.getKlingonShipIndicator function declaration - end

    // GameState.firePhasers function declaration - begin
    this.firePhasers = function(phaserEnergy)
    {
      var math = new CommonMath();
      var energyValue = math.convertStringToFloat(phaserEnergy);

      var lines = new ManagedStringCollection();

      if (energyValue < 1 || energyValue > this.energyRemaining)
      {
        lines.push("");
        lines.push("Invalid energy level.");
        lines.push("");
        return lines.getItems();
      }

      lines.push("");
      lines.push("Firing phasers...");

      var destroyedShips = new IntCollection();
      for (var index = 0; index < this.klingonShips.getLength(); index++)
      {
        var ship = this.klingonShips.getItem(index);

        this.energyRemaining -= math.convertFloatToInt(energyValue);
        if (this.energyRemaining < 0)
        {
          this.energyRemaining = 0;
          break;
        }

        var distance = math.calculateDistance(this.sectorX, this.sectorY, ship.sectorX, ship.sectorY);
        var deliveredEnergy = energyValue * (1.0 - distance / 11.3);
        ship.shieldLevel -= math.convertFloatToInt(deliveredEnergy);
        
        if (ship.shieldLevel <= 0)
        {
          var args =  [ (ship.sectorX + 1), (ship.sectorY + 1) ];
          lines.push((new StringFormatter()).format("Klingon ship destroyed at sector [{0},{1}].", args));
          destroyedShips.push(index);
        }
        else
        {
          var args =  
          [
            (ship.sectorX + 1),
            (ship.sectorY + 1),
            ship.shieldLevel
          ];

          var line = (new StringFormatter()).format("Hit ship at sector [{0},{1}]. Klingon shield strength dropped to {2}.", args);
          lines.push(line);
        }
      }

      for (var index = 0; index < destroyedShips.getLength(); index++)
      {
        var shipIndex = destroyedShips.getItem(index);

        var ship = this.klingonShips.getItem(shipIndex);

        var quadrant = this.allQuadrants.getItem(this.quadrantY, this.quadrantX);
        if (null != quadrant)
        {
          quadrant.removeKlingon(ship);
        }

        this.numberKlingonsRemaining--;

        if (null != ship)
        {
          // "" empty, "s" star, "k" klingon, "e" starship, "b" base
          this.currentSector.setItem(ship.sectorY, ship.sectorX, "");
        }
      }

      this.klingonShips.removeIndices(destroyedShips.getItems());

      if (this.klingonShips.getLength() > 0)
      {
        lines.push("");
        lines.pushRange(this.generateKlingonAttack());
      }
      return lines.getItems();
    }
    // GameState.firePhasers function declaration - end

    // GameState.fireTorpedo function declaration - begin
    this.fireTorpedo = function(direction)
    {
      var math = new CommonMath();
      var directionValue = math.convertStringToFloat(direction);

      var lines = new ManagedStringCollection();

      if (directionValue < 1.0 || directionValue > 9.0)
      {
        lines.push("");
        lines.push("Invalid directionValue.");
        lines.push("");
        return lines.getItems();
      }

      this.photonTorpedoes--;

      var angle = -(math.pi() * (directionValue - 1.0) / 4.0);
      if (math.randomNext(3) == 0)
      {
        angle += ((1.0 - 2.0 * math.randomNextDouble()) * math.pi() * 2.0) * 0.03;
      }

      var x = this.sectorX;
      var y = this.sectorY;
      var vx = math.cos(angle) / 20;
      var vy = math.sin(angle) / 20;
      var lastX = -1, lastY = -1;
      var newX = this.sectorX;
      var newY = this.sectorY;

      var torpedoCourse = "";
      var torpedoImpact = new ManagedStringCollection();
      var didTorpedoHit = false;
      while (x >= 0 && y >= 0 && math.round(x) < 8 && math.round(y) < 8)
      {
        newX = math.convertFloatToInt(math.round(x));
        newY = math.convertFloatToInt(math.round(y));

        if (lastX != newX || lastY != newY)
        {
          if (torpedoCourse != "")
          {
            torpedoCourse += ", ";
          }

          var args =  [ newX + 1, newY + 1 ];
          torpedoCourse += (new StringFormatter()).format("  [{0},{1}]", args);
          lastX = newX;
          lastY = newY;
        }

        var destroyedShipIndex = -1;
        for (var index = 0; index < this.klingonShips.getLength(); index++)
        {
          var ship = this.klingonShips.getItem(index);

          if (ship.sectorX == newX && ship.sectorY == newY)
          {
            var torpedoDamage = 500 + math.randomNext(50);
            ship.shieldLevel -= torpedoDamage;
            var isShipDestroyed = (ship.shieldLevel <= 0) || this.selectedScenario == 1;

            if (isShipDestroyed)
            {
              destroyedShipIndex = index;

              var args =  [ (ship.sectorX + 1), (ship.sectorY + 1) ];
              torpedoImpact.push((new StringFormatter()).format("Klingon ship destroyed at sector [{0},{1}].", args));

              // "" empty, "s" star, "k" klingon, "e" starship, "b" base
              this.currentSector.setItem(ship.sectorY, ship.sectorX, "");

              this.numberKlingonsRemaining--;

              var quadrant = this.allQuadrants.getItem(this.quadrantY, this.quadrantX);
              if (null != quadrant)
              {
                quadrant.removeKlingon(ship);
              }
            }
            else
            {
              var args =  
              [
                (ship.sectorX + 1),
                (ship.sectorY + 1),
                ship.shieldLevel
              ];

              var line = (new StringFormatter()).format("Torpedo hit ship at sector [{0},{1}]. Klingon shield strength dropped to {2}.", args);
              torpedoImpact.push(line);
            }

            didTorpedoHit = true;
            break;
          }
        }
        if (destroyedShipIndex != -1)
        {
          this.klingonShips.removeIndex(destroyedShipIndex);
        }

        if (didTorpedoHit)
        {
          break;
        }

        var coordArgs =  [ newX + 1, newY + 1 ];

        // "" empty, "s" star, "k" klingon, "e" starship, "b" base
        switch (this.currentSector.getItem(newY, newX))
        {
          case "b":
            this.numberStarbasesRemaining--;

            var quadrant = this.allQuadrants.getItem(this.quadrantY, this.quadrantX);
            if (null != quadrant)
            {
              quadrant.starbase = false;
            }

            this.currentSector.setItem(newY, newX, "");

            torpedoImpact.push((new StringFormatter()).format("You destroyed a Federation starbase at sector [{0},{1}]!", coordArgs));
            didTorpedoHit = true;
            break;

          case "s":
            torpedoImpact.push((new StringFormatter()).format("The torpedo was captured by a star's gravitational field at sector [{0},{1}].", coordArgs));
            didTorpedoHit = true;
            break;
        }
        if (didTorpedoHit)
        {
          break;
        }

        x += vx;
        y += vy;
      }

      lines.push("Photon torpedo fired... " + torpedoCourse);
      lines.pushRange(torpedoImpact.getItems());

      if (didTorpedoHit == false)
      {
        lines.push("Photon torpedo failed to hit anything.");
      }

      if (this.klingonShips.getLength() > 0)
      {
        lines.push("");
        lines.pushRange(this.generateKlingonAttack());
      }
      return lines.getItems();
    }
    // GameState.fireTorpedo function declaration - end

    // GameState.generateDamage function declaration - begin
    this.generateDamage = function()
    {
      var math = new CommonMath();

      if (math.randomNext(7) > 0)
      {
        return  [ ];
      }

      var lines = new ManagedStringCollection();

      var damage = 1 + math.randomNext(5);
      var item = math.randomNext(7);

      switch (item)
      {
        case 0:
          this.navigationDamage = damage;
          lines.push("Warp engines are malfunctioning.");
          break;
        case 1:
          this.shortRangeScanDamage = damage;
          lines.push("Short range scanner is malfunctioning.");
          break;
        case 2:
          this.longRangeScanDamage = damage;
          lines.push("Long range scanner is malfunctioning.");
          break;
        case 3:
          this.shieldControlDamage = damage;
          lines.push("Shield controls are malfunctioning.");
          break;
        case 4:
          this.computerDamage = damage;
          lines.push("The main computer is malfunctioning.");
          break;
        case 5:
          this.photonDamage = damage;
          lines.push("Photon torpedo controls are malfunctioning.");
          break;
        case 6:
          this.phaserDamage = damage;
          lines.push("Phasers are malfunctioning.");
          break;
      }

      lines.push("");
      return lines.getItems();
    }
    // GameState.generateDamage function declaration - end

    // GameState.generateKlingonAttack function declaration - begin
    this.generateKlingonAttack = function()
    {
      var lines = new ManagedStringCollection();

      var math = new CommonMath();

      if (this.klingonShips.getLength() > 0)
      {
        for (var index = 0; index < this.klingonShips.getLength(); index++)
        {
          var ship = this.klingonShips.getItem(index);

          if (this.docked)
          {
            var args =  [ ship.classDesignation, (ship.sectorX + 1), (ship.sectorY + 1) ];
            var line = (new StringFormatter()).format("Your starship hit by the Klingon {0} battle cruiser at sector [{1},{2}]. No damage due to starbase shields.", args);
            lines.push(line);
          }
          else
          {
            var baseDamage = 0.0;
            if (ship.classDesignation == "D7")
            {
              baseDamage = 1200.0;
            }
            else if (ship.classDesignation == "D6")
            {
              baseDamage = 600.0;
            }
            else
            {
              baseDamage = 300.0;
            }

            var distance = math.calculateDistance(this.sectorX, this.sectorY, ship.sectorX, ship.sectorY);
            var deliveredEnergy = baseDamage * math.randomNextDouble() * (1.0 - distance / 11.3);
            this.shieldLevel -= math.convertFloatToInt(deliveredEnergy);
            if (this.shieldLevel < 0)
            {
              this.shieldLevel = 0;
              this.destroyed = true;
            }

            var args =  [ ship.classDesignation, (ship.sectorX + 1), (ship.sectorY + 1), this.shieldLevel ];
            var hitLine = (new StringFormatter()).format("Your starship hit by the Klingon {0} battle cruiser at sector [{1},{2}]. Shields dropped to {3}.", args);
            lines.push(hitLine);

            if (this.shieldLevel == 0)
            {
              return lines.getItems();
            }
          }
        }
      }

      return lines.getItems();
    }
    // GameState.generateKlingonAttack function declaration - end

    // GameState.generateSectorAtQuadrantXY function declaration - begin
    this.generateSectorAtQuadrantXY = function()
    {
      // Reference the quadrant.

      var quadrant = this.allQuadrants.getItem(this.quadrantY, this.quadrantX);

      // Wipe previous state.

      this.klingonShips.clear();
      this.currentSector.clear();

      if (quadrant.starbase)
      {
        // Position the starbase.  The starbase should be located in the same position every time 
        // the player's starship visits it.  Instead of storing the position, just base the starbase's 
        // position on the quadrant's coordinates.

        this.starbaseY = this.quadrantY;
        this.starbaseX = this.quadrantX;

        // "" empty, "s" star, "k" klingon, "e" starship, "b" base
        this.currentSector.setItem(this.starbaseY, this.starbaseX, "b");

        if (this.sectorY == this.starbaseY && this.sectorX == this.starbaseX)
        {
          // If we've reached this point, then there is a starbase, and player's starship landed on 
          // top of it.  Our visualization can't represent this, and the starbase's position is 
          // immutable.  So just adjust the player's starship's position.

          if (this.sectorX < 1)
          {
            this.sectorX++;
          }
          else
          {
            this.sectorX--;
          }
        }
      }

      // Position the player's starship.

      // "" empty, "s" star, "k" klingon, "e" starship, "b" base
      this.currentSector.setItem(this.sectorY, this.sectorX, "e");

      // Position the stars deterministically.  If the player's starship or starbase is already present in
      // a particular star's location, just exclude that star, it is of little consquence to the 
      // game.

      var starPositions =  [ ];
      var patternIndex = this.quadrantX * 2 + this.quadrantY;
      if (patternIndex < 0)
      {
        patternIndex = 0;
      }
      if (patternIndex > 23)
      {
        patternIndex -= 23;
      }
      switch (patternIndex)
      {
        case 0: starPositions =  [ 1, 22, 20, 58, 34, 72, 17, 0, 39, 28 ]; break;
        case 1: starPositions =  [ 15, 46, 55, 50, 35, 1, 4, 30, 59, 39 ]; break;
        case 2: starPositions =  [ 73, 64, 13, 11, 62, 71, 3, 27, 1, 52 ]; break;
        case 3: starPositions =  [ 65, 50, 71, 32, 19, 40, 0, 8, 33, 54 ]; break;
        case 4: starPositions =  [ 71, 21, 47, 74, 68, 30, 3, 61, 35, 64 ]; break;
        case 5: starPositions =  [ 58, 51, 53, 48, 33, 30, 52, 1, 6, 57 ]; break;
        case 6: starPositions =  [ 61, 24, 56, 16, 29, 11, 50, 69, 67, 29 ]; break;
        case 7: starPositions =  [ 31, 24, 16, 31, 58, 75, 0, 2, 42, 42 ]; break;
        case 8: starPositions =  [ 60, 16, 60, 56, 11, 7, 0, 37, 51, 29 ]; break;
        case 9: starPositions =  [ 37, 38, 9, 35, 54, 62, 49, 28, 31, 33 ]; break;
        case 10: starPositions =  [ 23, 69, 15, 25, 30, 6, 5, 8, 47, 36 ]; break;
        case 11: starPositions =  [ 37, 18, 27, 33, 1, 45, 75, 53, 60, 8 ]; break;
        case 12: starPositions =  [ 64, 73, 57, 47, 74, 37, 34, 23, 54, 49 ]; break;
        case 13: starPositions =  [ 70, 23, 53, 71, 70, 46, 49, 35, 74, 50 ]; break;
        case 14: starPositions =  [ 76, 54, 6, 53, 36, 69, 40, 4, 67, 60 ]; break;
        case 15: starPositions =  [ 28, 35, 25, 72, 71, 69, 16, 67, 60, 41 ]; break;
        case 16: starPositions =  [ 4, 18, 46, 69, 20, 48, 53, 72, 7, 27 ]; break;
        case 17: starPositions =  [ 6, 4, 57, 43, 41, 8, 59, 27, 48, 44 ]; break;
        case 18: starPositions =  [ 10, 35, 27, 15, 65, 16, 72, 23, 5, 48 ]; break;
        case 19: starPositions =  [ 54, 15, 63, 7, 52, 21, 33, 21, 36, 21 ]; break;
        case 20: starPositions =  [ 27, 41, 43, 45, 64, 3, 59, 34, 52, 49 ]; break;
        case 21: starPositions =  [ 24, 17, 14, 44, 41, 59, 14, 44, 47, 13 ]; break;
        case 22: starPositions =  [ 66, 45, 70, 2, 11, 65, 26, 37, 24, 2 ]; break;
        case 23: starPositions =  [ 19, 56, 42, 21, 25, 30, 58, 70, 73, 66 ]; break;
      }

      var math = new CommonMath();

      var starsToBePlaced = quadrant.stars;
      var positionIndex = 0;
      var numberOfLaps = 0;
      while (starsToBePlaced > 0)
      {
        var itemPosition = starPositions[positionIndex];
        if (numberOfLaps > 0)
        {
          if (numberOfLaps % 2 == 1)
          {
            itemPosition += numberOfLaps * 2;
          }
          else
          {
            itemPosition -= numberOfLaps * 3;
          }
        }

        while (itemPosition > 77)
        {
          itemPosition -= 77;
        }
        while (itemPosition < 0)
        {
          itemPosition += 77;
        }

        var i = math.convertFloatToInt(itemPosition / 11);
        if (i > 7)
        {
          i -= 7;
        }

        var j = math.convertFloatToInt(itemPosition % 11);
        if (j > 7)
        {
          j -= 7;
        }

        if (this.quadrantY % 2 == 1)
        {
          var swap = i;
          i = j;
          j = swap;
        }

        if (this.quadrantX % 2 == 1)
        {
          i = 7 - i;
        }

        if (this.isSectorRegionEmpty(i, j))
        {
          // "" empty, "s" star, "k" klingon, "e" starship, "b" base
          this.currentSector.setItem(i, j, "s");
          starsToBePlaced--;
        }

        positionIndex++;
        if (positionIndex >= starPositions.length)
        {
          positionIndex = 0;
          numberOfLaps++;
        }
      }

      // Position klingons randomly.

      for (var classIndex = 0; classIndex < 3; classIndex++)
      {
        var klingonsToBePositioned = 0;
        var classDesignation = "";

        switch (classIndex)
        {
          case 0:
            klingonsToBePositioned = quadrant.numberOfKlingonD5s;
            classDesignation = "D5"; 
            break;

          case 1:
            klingonsToBePositioned = quadrant.numberOfKlingonD6s;
            classDesignation = "D6"; 
            break;

          case 2:
            klingonsToBePositioned = quadrant.numberOfKlingonD7s;
            classDesignation = "D7"; 
            break;
        }

        while (klingonsToBePositioned > 0)
        {
          var i = math.randomNext(8);
          var j = math.randomNext(8);
          if (this.isSectorRegionEmpty(i, j))
          {
            // "" empty, "s" star, "k" klingon, "e" starship, "b" base
            this.currentSector.setItem(i, j, "k");

            var shieldValue = 0;
            switch (classIndex)
            {
              case 0:
                shieldValue = 300 + math.randomNext(200);
                break;

              case 1:
                shieldValue = 600 + math.randomNext(400);
                break;

              case 2:
                shieldValue = 2200 + math.randomNext(800);
                break;
            }

            var klingonShip = new KlingonShip(classDesignation, j, i, shieldValue);

            this.klingonShips.push(klingonShip);
            klingonsToBePositioned--;
          }
        }
      }
    }
    // GameState.generateSectorAtQuadrantXY function declaration - end

    // GameState.getComputerPrompt function declaration - begin
    this.getComputerPrompt = function()
    {
      if (this.computerDamage > 0)
      {
        var errorLines = new ManagedStringCollection();
        errorLines.push("The main computer is damaged. Repairs are underway.");
        errorLines.push("");
        return new CommandTag("prompt", errorLines.getItems(), false);
      }

      var lines = new ManagedStringCollection();
      lines.pushRange(this.getPrompt());
      lines.pushRange(this.getComputerStrings());
      lines.push("");
      lines.push("Enter computer command: ");

      return new CommandTag("compprompt", lines.getItems(), true);
    }
    // GameState.getComputerPrompt function declaration - end

    // GameState.getComputerFirstResponse function declaration - begin
    this.getComputerFirstResponse = function(command)
    {
      if (null == command)
      {
        command = "";
      }
      command = (new StringFormatter()).getStanardizedInput(command);

      if ("rec" == command)
      {
        var recLines = new ManagedStringCollection();
        recLines.pushRange(this.getGalacticRecord());
        recLines.push("");
        return new CommandTag("prompt", recLines.getItems(), true);
      }

      if ("sta" == command)
      {
        var staLines = new ManagedStringCollection();
        staLines.push("STAR TREK");
        staLines.push("");
        staLines.push("STATUS");
        staLines.pushRange(this.getDisplayStatus());
        staLines.push("(TO CONTINUE, HIT 'RETURN')");
        return new CommandTag("prompt", this.applyThemeToVerticalSpace(staLines.getItems()), true);
      }

      if ("col" == command)
      {
        this.isScreenGreen = !this.isScreenGreen;
        return new CommandTag("prompt", this.getFirstPrompt(), true);
      }

      if ("con" == command)
      {
        this.isScreenHighContrast = !this.isScreenHighContrast;
        return new CommandTag("prompt", this.getFirstPrompt(), true);
      }

      if ("bas" == command)
      {
        var basLines = new ManagedStringCollection();
        basLines.pushRange(this.getStarbaseDirection());
        basLines.push("");
        return new CommandTag("prompt", basLines.getItems(), false);
      }

      if ("nav" == command)
      {
        var lines = new ManagedStringCollection();

        var args =  [ (this.quadrantX + 1), (this.quadrantY + 1) ];
        lines.push((new StringFormatter()).format("Your starship is located in quadrant [{0},{1}].", args));
        lines.push("");
        lines.push("Enter destination quadrant X (1--8): ");
        return new CommandTag("getnavcalcx", lines.getItems(), false);
      }

      var errorLines = new ManagedStringCollection();
      errorLines.push("Invalid computer command.");
      errorLines.push("");
      return new CommandTag("prompt", errorLines.getItems(), false);
    }
    // GameState.getComputerFirstResponse function declaration - end

    // GameState.getDamageRepairReport function declaration - begin
    this.getDamageRepairReport = function()
    {
      var lines = new ManagedStringCollection();

      if (this.navigationDamage > 0)
      {
        this.navigationDamage--;
        if (this.navigationDamage == 0)
        {
          lines.push("Warp engines have been repaired.");
        }
        lines.push("");
        return lines.getItems();
      }
      if (this.shortRangeScanDamage > 0)
      {
        this.shortRangeScanDamage--;
        if (this.shortRangeScanDamage == 0)
        {
          lines.push("Short range scanner has been repaired.");
        }
        lines.push("");
        return lines.getItems();
      }
      if (this.longRangeScanDamage > 0)
      {
        this.longRangeScanDamage--;
        if (this.longRangeScanDamage == 0)
        {
          lines.push("Long range scanner has been repaired.");
        }
        lines.push("");
        return lines.getItems();
      }
      if (this.shieldControlDamage > 0)
      {
        this.shieldControlDamage--;
        if (this.shieldControlDamage == 0)
        {
          lines.push("Shield controls have been repaired.");
        }
        lines.push("");
        return lines.getItems();
      }
      if (this.computerDamage > 0)
      {
        this.computerDamage--;
        if (this.computerDamage == 0)
        {
          lines.push("The main computer has been repaired.");
        }
        lines.push("");
        return lines.getItems();
      }
      if (this.photonDamage > 0)
      {
        this.photonDamage--;
        if (this.photonDamage == 0)
        {
          lines.push("Photon torpedo controls have been repaired.");
        }
        lines.push("");
        return lines.getItems();
      }
      if (this.phaserDamage > 0)
      {
        this.phaserDamage--;
        if (this.phaserDamage == 0)
        {
          lines.push("Phasers have been repaired.");
        }
        lines.push("");
        return lines.getItems();
      }

      return  [ ];
    }
    // GameState.getDamageRepairReport function declaration - end

    // GameState.getDisplayStatus function declaration - begin
    this.getDisplayStatus = function()
    {
      var display = null;

      // "c" classic console, "s" suppa text, "p" pre oriented
      if (this.getTheme() == "s")
      {
        display = 
        [
          "",
          this.timeRemaining + " = Time Remaining",
          this.numberKlingonsRemaining + " = Klingon Ships Remaining",
          this.numberStarbasesRemaining + " = Starbases",
          this.navigationDamage + " = Warp Engine Damage",
          this.shortRangeScanDamage + " = Short Range Scanner Damage",
          this.longRangeScanDamage + " = Long Range Scanner Damage",
          this.shieldControlDamage + " = Shield Controls Damage",
          this.computerDamage + " = Main Computer Damage",
          this.photonDamage + " = Photon Torpedo Control Damage",
          this.phaserDamage + " = Phaser Damage",
          "",
        ];
        return display;
      }

      display = 
      [
        "",
        "               Time Remaining: " + this.timeRemaining,
        "      Klingon Ships Remaining: " + this.numberKlingonsRemaining,
        "                    Starbases: " + this.numberStarbasesRemaining,
        "           Warp Engine Damage: " + this.navigationDamage,
        "   Short Range Scanner Damage: " + this.shortRangeScanDamage,
        "    Long Range Scanner Damage: " + this.longRangeScanDamage,
        "       Shield Controls Damage: " + this.shieldControlDamage,
        "         Main Computer Damage: " + this.computerDamage,
        "Photon Torpedo Control Damage: " + this.photonDamage,
        "                Phaser Damage: " + this.phaserDamage,
        "",
      ];
      return display;
    }
    // GameState.getDisplayStatus function declaration - end

    // GameState.getEndOfGameStatus function declaration - begin
    this.getEndOfGameStatus = function()
    {
      var status = "";

      if (this.destroyed)
      {
        status = "MISSION FAILED: YOUR STARSHIP WAS DESTROYED!!!";
      }
      else if (this.energyRemaining == 0)
      {
        status = "MISSION FAILED: YOUR STARSHIP RAN OUT OF ENERGY.";
      }
      else if (this.numberKlingonsRemaining == 0)
      {
        status = "MISSION ACCOMPLISHED: ALL KLINGON SHIPS DESTROYED. WELL DONE!!!";
      }
      else if (this.timeRemaining == 0)
      {
        status = "MISSION FAILED: RAN OUT OF TIME.";
      }
      if ("" == status)
      {
        return  [ ];
      }
      return  [ status, "" ];
    }
    // GameState.getEndOfGameStatus function declaration - end

    // GameState.getFirstPrompt function declaration - begin
    this.getFirstPrompt = function()
    {
      var lines = new ManagedStringCollection();

      lines.push("STAR TREK");
      lines.push("");
      lines.pushRange(this.getJoinedShortAndLongRangeScan());
      lines.pushRange(this.getCommandStrings());
      lines.push("");
      lines.push("Enter command: ");

      return lines.getItems();
    }
    // GameState.getFirstPrompt function declaration - end

    // GameState.getGalacticRecord function declaration - begin
    this.getGalacticRecord = function()
    {
      var lines = new ManagedStringCollection();

      // "c" classic console, "s" suppa text, "p" pre oriented
      if (this.getTheme() == "p")
      {
        lines.push("STAR TREK - CUMULATIVE GALACTIC RECORD");
        lines.push("");
        lines.push("      1     2     3     4     5     6     7     8");
        lines.push("   -------------------------------------------------");
      }
      else if (this.getTheme() == "s")
      {
        lines.push("STAR TREK");
        lines.push("");
        lines.push("CUMULATIVE GALACTIC RECORD");
        lines.push("");
        lines.push("--+--1--+--2--+--3--+--4--+--5--+--6--+--7--+--8--+");
      }
      else
      {
        lines.push("STAR TREK");
        lines.push("");
        lines.push("CUMULATIVE GALACTIC RECORD");
        lines.push("");
        lines.push("      1     2     3     4     5     6     7     8");
        lines.push("   -------------------------------------------------");
      }

      for (var i = 0; i < 8; i++)
      {
        var sb = new StringAccumulator();

        // "c" classic console, "s" suppa text, "p" pre oriented
        if (this.getTheme() != "s")
        {
          switch (i)
          {
            case 0: sb.appendLine("   |        ANTARES        |         SIRIUS        |"); break;
            case 1: sb.appendLine("   |         RIGEL         |         DENEB         |"); break;
            case 2: sb.appendLine("   |        PROCYON        |        CAPELLA        |"); break;
            case 3: sb.appendLine("   |         VEGA          |       BETELGEUSE      |"); break;
            case 4: sb.appendLine("   |        CANOPUS        |       ALDEBARAN       |"); break;
            case 5: sb.appendLine("   |        ALTAIR         |        REGULUS        |"); break;
            case 6: sb.appendLine("   |      SAGITTARIUS      |        ARCTURUS       |"); break;
            case 7: sb.appendLine("   |        POLLUX         |         SPICA         |"); break;
          }
        }

        // "c" classic console, "s" suppa text, "p" pre oriented
        if (this.getTheme() == "s")
        {
          sb.append(i + 1);
          sb.append(" ");
        }
        else
        {
          sb.append(" ");
          sb.append(i + 1);
          sb.append(" ");
        }

        for (var j = 0; j < 8; j++)
        {
          // "c" classic console, "s" suppa text, "p" pre oriented
          if (0 == j || 4 == j || this.getTheme() == "s")
          {
            sb.append("|");
          }
          else
          {
            sb.append(" ");
          }

          var leftSpacer = " ";
          var rightSpacer = " ";
          if (this.quadrantX == j && this.quadrantY == i)
          {
            // "c" classic console, "s" suppa text, "p" pre oriented
            if (this.getTheme() == "s" || this.getTheme() == "p")
            {
              leftSpacer = "(";
              rightSpacer = ")";
            }
            else
            {
              leftSpacer = "·";
              rightSpacer = "·";
            }
          }
          sb.append(leftSpacer);

          var klingonCount = 0;
          var starbaseCount = 0;
          var starCount = 0;
          var quadrant = this.allQuadrants.getItem(i, j);
          if (null != quadrant && quadrant.scanned)
          {
            klingonCount = quadrant.getNumberOfKlingons();
            starCount = quadrant.stars;

            if (quadrant.starbase)
            {
              starbaseCount = 1;
            }
          }

          var args =  [ klingonCount, starbaseCount, starCount ];
          sb.append((new StringFormatter()).format("{0}{1}{2}", args));
          sb.append(rightSpacer);
        }
        sb.append("|");

        lines.pushRange(sb.getItems());

        // "c" classic console, "s" suppa text, "p" pre oriented
        if (this.getTheme() == "s")
        {
          lines.push("--+-----+-----+-----+-----+-----+-----+-----+-----+");
        }
        else
        {
          lines.push("   -------------------------------------------------");
        }
      }

      // "c" classic console, "s" suppa text, "p" pre oriented
      if (this.getTheme() == "s")
      {
        lines.push("THE THREE NUMBERS '###' FOR EACH QUADRANT REFER TO");
        lines.push("#KLINGONS, #STARBASES, #STARS.");
        lines.push("YOUR POSITION IS INDICATED BY THE ().");
        lines.push("-");
      }
      lines.push("(TO CONTINUE, HIT 'RETURN')");

      return lines.getItems();
    }
    // GameState.getGalacticRecord function declaration - end

    // GameState.getJoinedShortAndLongRangeScan function declaration - begin
    this.getJoinedShortAndLongRangeScan = function()
    {
      var srs = new ManagedStringCollection();
      srs.push("SHORT RANGE SCAN");
      if (this.shortRangeScanDamage > 0)
      {
        srs.push("Short range scanner is damaged.");
        srs.push("Repairs are underway.");
      }
      else
      {
        srs.pushRange(this.getShortRangeScan());
      }

      var lrs = new ManagedStringCollection();
      lrs.push("LONG RANGE SCAN");
      if (this.longRangeScanDamage > 0)
      {
        lrs.push("Long range scanner is damaged.");
        lrs.push("Repairs are underway.");
      }
      else
      {
        lrs.pushRange(this.getLongRangeScan());
        lrs.push("THE THREE NUMBERS '###'");
        lrs.push("FOR EACH QUADRANT REFER TO");
        lrs.push("#KLINGONS, #STARBASES, #STARS.");
      }
      var lrsLines = lrs.getItems();

      // "c" classic console, "s" suppa text, "p" pre oriented
      if (this.getTheme() == "s")
      {
        for (var index = 0; index < lrsLines.length; index++)
        {
          lrsLines[index] = " " + lrsLines[index];
        }
      }

      var merge = new ManagedStringCollection();
      merge.pushRange((new ManagedStringCollection()).getHorizontalMerge(srs.getItems(), lrsLines, 2, 34, this.getTheme()));
      if (this.shortRangeScanDamage <= 0)
      {
        var quadrant = this.allQuadrants.getItem(this.quadrantY, this.quadrantX);
        if (null != quadrant)
        {
          merge.pushRange(this.getStandardWarnings(quadrant));
        }
      }
      return merge.getItems();
    }
    // GameState.getJoinedShortAndLongRangeScan function declaration - end

    // GameState.getLongRangeScan function declaration - begin
    this.getLongRangeScan = function()
    {
      var lines = new ManagedStringCollection();

      if (this.longRangeScanDamage > 0)
      {
        lines.push("Long range scanner is damaged. Repairs are underway.");
        lines.push("");
        return lines.getItems();
      }

      lines.push("-------------------");
      for (var i = this.quadrantY - 1; i <= this.quadrantY + 1; i++)
      {
        var rowSb = new StringAccumulator();
        for (var j = this.quadrantX - 1; j <= this.quadrantX + 1; j++)
        {
          rowSb.append("|");

          var leftSpacer = " ";
          var rightSpacer = " ";
          if (this.quadrantX == j && this.quadrantY == i)
          {
            // "c" classic console, "s" suppa text, "p" pre oriented
            if (this.getTheme() == "s" || this.getTheme() == "p")
            {
              leftSpacer = "(";
              rightSpacer = ")";
            }
            else
            {
              leftSpacer = "·";
              rightSpacer = "·";
            }
          }
          rowSb.append(leftSpacer);

          var klingonCount = 0;
          var starbaseCount = 0;
          var starCount = 0;

          if (i >= 0 && j >= 0 && i < 8 && j < 8)
          {
            var quadrant = this.allQuadrants.getItem(i, j);
            if (null != quadrant)
            {
              quadrant.scanned = true;
              klingonCount = quadrant.getNumberOfKlingons();
              starCount = quadrant.stars;

              if (quadrant.starbase)
              {
                starbaseCount = 1;
              }
            }
          }

          var args =  [ klingonCount, starbaseCount, starCount ];
          rowSb.append((new StringFormatter()).format("{0}{1}{2}", args));
          rowSb.append(rightSpacer);
        }
        rowSb.append("|");

        lines.pushRange(rowSb.getItems());
        lines.push("-------------------");
      }

      return lines.getItems();
    }
    // GameState.getLongRangeScan function declaration - end

    // GameState.applyThemeToVerticalSpace function declaration - begin
    this.applyThemeToVerticalSpace = function(display)
    {
      if (null == display)
      {
        return  [ ];
      }

      // "c" classic console, "s" suppa text, "p" pre oriented
      if (this.getTheme() == "s" || this.getTheme() == "p")
      {
        for (var index = 0; index < display.length; index++)
        {
          if (display[index] == null || display[index] == "")
          {
            display[index] = "-";
          }
        }
      }

      return display;
    }
    // GameState.applyThemeToVerticalSpace function declaration - end

    // GameState.setMission function declaration - begin
    this.setMission = function(scenarioInput)
    {
      var math = new CommonMath();

      var newScenario = math.convertStringToInt(scenarioInput);
      if (newScenario < 1 || newScenario > 3)
      {
        newScenario = 1;
      }

      this.selectedScenario = newScenario;
      this.syncToScenario();
      
      return new CommandTag("mission", this.getMission(), true);
    }
    // GameState.setMission function declaration - end

    // GameState.getMission function declaration - begin
    this.getMission = function()
    {
      var formatter = new StringFormatter();
      var math = new CommonMath();

      var deadline = this.stardate + math.convertIntToFloat(this.timeRemaining) / 100.0;
      var deadlineFormatted = formatter.toFixed(deadline, 2);

      var isAre = "ARE";
      var pluralization = "S";
      if (1 == this.numberStarbasesRemaining)
      {
        isAre = "IS";
        pluralization = "";
      }

      var banner0 = " STAR TREK - THE MISSION";
      var banner1 = " -----------------------";
      var line0 = " YOUR ORDERS ARE AS FOLLOWS:";
      var line1 = formatter.format(" DESTROY THE {0} KLINGON WARSHIPS WHICH HAVE INVADED",  [ this.numberKlingonsRemaining ]);
      var line2 = " THE GALAXY BEFORE THEY CAN ATTACK FEDERATION HEADQUARTERS";
      var line3 = formatter.format(" ON STARDATE {0}. THIS GIVES YOU {1} DAYS. THERE {2}",  [ deadlineFormatted, this.timeRemaining, isAre ]);
      var line4 = formatter.format(" {0} STARBASE{1} IN THE GALAXY FOR RESUPPLYING YOUR SHIP.",  [ this.numberStarbasesRemaining, pluralization ]);

      var missionLines = new ManagedStringCollection();
      missionLines.pushRange( [ banner0, banner1, line0, "", line1, line2, line3, line4 ]);

      if (this.selectedScenario == 2)
      {
        missionLines.push("");
        missionLines.push(" In this scenario, the Klingons use both D5 and D6 battle cruisers.");
        missionLines.push(" You can identify them on your short range scan as follows...");
        missionLines.push("");
        missionLines.push(" -=--=--=--=--=--=--=--=-             Region: Archanis");
        missionLines.push("                                    Quadrant: [7,6]");
        missionLines.push("              *     * >!<             Sector: [4,6]");
        missionLines.push("    +D5                             Stardate: 2256.0");
        missionLines.push("  *          +D6              Time remaining: 42");
        missionLines.push("                                   Condition: RED");
        missionLines.push("          <E>       *                 Energy: 1997");
        missionLines.push("     *                               Shields: 1000");
        missionLines.push("     *                      Photon Torpedoes: 15");
        missionLines.push(" -=--=--=--=--=--=--=--=-             Docked: False");
        missionLines.push("");
        missionLines.push(" +D5 = KLINGON D5 BATTLE CRUISER");
        missionLines.push(" +D6 = KLINGON D6 BATTLE CRUISER (TOUGH! TAKES MORE THAN A SINGLE TORPEDO TO DESTROY!)");
      }
      else if (this.selectedScenario == 3)
      {
        missionLines.push("");
        missionLines.push(" In this scenario, the Klingons use D5, D6, and D7 battle cruisers.");
        missionLines.push(" You can identify them on your short range scan as follows...");
        missionLines.push("");
        missionLines.push(" -=--=--=--=--=--=--=--=-             Region: Archanis");
        missionLines.push("                                    Quadrant: [7,6]");
        missionLines.push("              *     * >!<             Sector: [4,6]");
        missionLines.push("    +D5                             Stardate: 3198.0");
        missionLines.push("  *          +D6              Time remaining: 42");
        missionLines.push("                                   Condition: RED");
        missionLines.push("          <E>       *                 Energy: 2997");
        missionLines.push("     *                               Shields: 2800");
        missionLines.push("     *       +D7            Photon Torpedoes: 30");
        missionLines.push(" -=--=--=--=--=--=--=--=-             Docked: False");
        missionLines.push("");
        missionLines.push(" +D5 = KLINGON D5 BATTLE CRUISER");
        missionLines.push(" +D6 = KLINGON D6 BATTLE CRUISER (TOUGH! TAKES MORE THAN A SINGLE TORPEDO TO DESTROY!)");
        missionLines.push(" +D7 = KLINGON D7 BATTLE CRUISER (TOUGHEST! CAN DESTROY A FEDERATION STARBASE!)");
      }

      missionLines.push("");
      missionLines.push(" HIT 'RETURN' WHEN YOU'RE READY TO ASSUME COMMAND ---");

      return this.applyThemeToVerticalSpace(missionLines.getItems());
    }
    // GameState.getMission function declaration - end

    // GameState.getNavCalcInputResult function declaration - begin
    this.getNavCalcInputResult = function(quadX)
    {
      var math = new CommonMath();
      var quadXValue = math.convertStringToInt(quadX);

      if (quadXValue < 1 || quadXValue > 8) 
      {
        var errorLines = new ManagedStringCollection();
        errorLines.push("Invalid X coordinate.");
        errorLines.push("");
        return new CommandTag("prompt", errorLines.getItems(), false);
      }

      var quadYPrompt =  
      [
        "",
        "Enter destination quadrant Y (1--8): "
      ];

      return new CommandTag("execnavcalc", quadYPrompt, false);
    }
    // GameState.getNavCalcInputResult function declaration - end

    // GameState.getNavCalcResult function declaration - begin
    this.getNavCalcResult = function(quadX,quadY)
    {
      var math = new CommonMath();

      var quadXValue = math.convertStringToInt(quadX);
      if (quadXValue < 1 || quadXValue > 8)
      {
        var errorLines = new ManagedStringCollection();
        errorLines.push("Invalid X coordinate.");
        errorLines.push("");
        return errorLines.getItems();
      }

      var quadYValue = math.convertStringToInt(quadY);
      if (quadYValue < 1 || quadYValue > 8)
      {
        var errorLines = new ManagedStringCollection();
        errorLines.push("Invalid Y coordinate.");
        errorLines.push("");
        return errorLines.getItems();
      }

      var lines = new ManagedStringCollection();

      lines.push("");
      var qx = quadXValue - 1;
      var qy = quadYValue - 1;
      if (qx == this.quadrantX && qy == this.quadrantY)
      {
        lines.push("That is the current location of your starship.");
        lines.push("");
        return lines.getItems();
      }

      var direction = math.calculateDirection(this.quadrantX, this.quadrantY, qx, qy);
      var directionFormatted = (new StringFormatter()).toFixed(direction, 2);

      var distance = math.calculateDistance(this.quadrantX, this.quadrantY, qx, qy);
      var distanceFormatted = (new StringFormatter()).toFixed(distance, 2);

      lines.push("Direction: " + directionFormatted);
      lines.push("Distance:  " + distanceFormatted);
      lines.push("");

      return lines.getItems();
    }
    // GameState.getNavCalcResult function declaration - end

    // GameState.getPrompt function declaration - begin
    this.getPrompt = function()
    {
      var lines = new ManagedStringCollection();

      lines.push("STAR TREK");
      lines.push("");
      lines.pushRange(this.getJoinedShortAndLongRangeScan());

      return lines.getItems();
    }
    // GameState.getPrompt function declaration - end

    // GameState.getPromptResult function declaration - begin
    this.getPromptResult = function(command)
    {
      if (null == command)
      {
        command = "";
      }
      command = (new StringFormatter()).getStanardizedInput(command);

      if ("tor" == command)
      {
        return new CommandTag("exectorp", this.getTorpedoPrompt(), true);
      }

      if ("pha" == command)
      {
        return new CommandTag("execphas", this.getPhaserPrompt(), true);
      }

      if ("she" == command)
      {
        return new CommandTag("execshield", this.getShieldPrompt(), true);
      }

      if ("nav" == command)
      {
        return new CommandTag("getwarpdir", this.getWarpDirectionPrompt(), true);
      }

      if ("com" == command)
      {
        return this.getComputerPrompt();
      }

      return new CommandTag("prompt", this.getFirstPrompt(), true);
    }
    // GameState.getPromptResult function declaration - end

    // GameState.getDistressCalls function declaration - begin
    this.getDistressCalls = function()
    {
      var distressCalls = new ManagedStringCollection();

      for (var i = 0; i < this.allStarbaseCoordinates.getLength(); i++)
      {
        var coordinates = this.allStarbaseCoordinates.getItem(i);
        if (null != coordinates)
        {
          var quadrant = this.allQuadrants.getItem(coordinates.i, coordinates.j);
          if (null != quadrant && quadrant.starbase && quadrant.getNumberOfKlingons() > 0)
          {
            var starbaseNumber = coordinates.i * 10 + coordinates.j + 1;
            var formatter = new StringFormatter();
            var distress = "Condition RED: Starbase K-" + starbaseNumber;

            if (coordinates.i == this.quadrantY && coordinates.j == this.quadrantX)
            {
              // Player's starship has already arrived to answer the call.

              var message = formatter.format("{0} in this quadrant is blockaded by Klingons, please assist.", [ distress ]);
              distressCalls.push(message);
            }
            else
            {
              // Distress call is remote.

              var math = new CommonMath();
              var direction = math.calculateDirection(this.quadrantX, this.quadrantY, coordinates.j, coordinates.i);
              var directionFormatted = formatter.toFixed(direction, 2);

              var distance = math.calculateDistance(this.quadrantX, this.quadrantY, coordinates.j, coordinates.i);
              var distanceFormatted = formatter.toFixed(distance, 2);

              var message = formatter.format("{0} is blockaded by Klingons, set course {1}, warp {2}.",  [ distress, directionFormatted, distanceFormatted ]);
              distressCalls.push(message);
            }
          }
        }

        if (distressCalls.getLength() >= 2)
        {
          break;
        }
      }

      return distressCalls;
    }
    // GameState.getDistressCalls function declaration - end

    // GameState.getSectorReport function declaration - begin
    this.getSectorReport = function(quadrant)
    {
      var formatter = new StringFormatter();
      var math = new CommonMath();

      var condition = "GREEN";
      if (quadrant.getNumberOfKlingons() > 0 || this.getDistressCalls().getLength() > 0)
      {
        condition = "RED";
      }
      else if (this.energyRemaining < 300)
      {
        condition = "YELLOW";
      }

      var lines = new ManagedStringCollection();
      var stardateFormatted = formatter.toFixed(this.stardate, 2);
      
      // "c" classic console, "s" suppa text, "p" pre oriented
      if (this.getTheme() == "s")
      {
        lines.push("-=--=--=--=--=--=--=--=- ----------- Region: " + quadrant.name);
        lines.push(this.createSectorRow(0, formatter.format(" --------- Quadrant: [{0},{1}]",  [ this.quadrantX + 1, this.quadrantY + 1 ])));
        lines.push(this.createSectorRow(1, formatter.format(" ----------- Sector: [{0},{1}]",  [ this.sectorX + 1, this.sectorY + 1 ])));
        lines.push(this.createSectorRow(2, " --------- Stardate: " + stardateFormatted));
        lines.push(this.createSectorRow(3, " --- Time remaining: " + this.timeRemaining));
        lines.push(this.createSectorRow(4, " -------- Condition: " + condition));
        lines.push(this.createSectorRow(5, " ----------- Energy: " + this.energyRemaining));
        lines.push(this.createSectorRow(6, " ---------- Shields: " + this.shieldLevel));
        lines.push(this.createSectorRow(7, " - Photon Torpedoes: " + this.photonTorpedoes));
        lines.push("-=--=--=--=--=--=--=--=- ----------- Docked: " + this.docked);
      }
      else
      {
        lines.push("-=--=--=--=--=--=--=--=-             Region: " + quadrant.name);
        lines.push(this.createSectorRow(0, formatter.format("           Quadrant: [{0},{1}]",  [ this.quadrantX + 1, this.quadrantY + 1 ])));
        lines.push(this.createSectorRow(1, formatter.format("             Sector: [{0},{1}]",  [ this.sectorX + 1, this.sectorY + 1 ])));
        lines.push(this.createSectorRow(2, "           Stardate: " + stardateFormatted));
        lines.push(this.createSectorRow(3, "     Time remaining: " + this.timeRemaining));
        lines.push(this.createSectorRow(4, "          Condition: " + condition));
        lines.push(this.createSectorRow(5, "             Energy: " + this.energyRemaining));
        lines.push(this.createSectorRow(6, "            Shields: " + this.shieldLevel));
        lines.push(this.createSectorRow(7, "   Photon Torpedoes: " + this.photonTorpedoes));
        lines.push("-=--=--=--=--=--=--=--=-             Docked: " + this.docked);
      }

      return this.applyThemeToVerticalSpace(lines.getItems());
    }
    // GameState.getSectorReport function declaration - end

    // GameState.getStandardWarnings function declaration - begin
    this.getStandardWarnings = function(quadrant)
    {
      var formatter = new StringFormatter();
      var distressCalls = this.getDistressCalls();

      var lines = new ManagedStringCollection();
      lines.push("");

      if (quadrant.getNumberOfKlingons() > 0)
      {
        var pluralization = "";
        if (quadrant.getNumberOfKlingons() > 1)
        {
          pluralization = "s";
        }

        var args =  [ pluralization ];
        lines.push(formatter.format("Condition RED: Klingon ship{0} detected.", args));
        if (this.shieldLevel == 0 && this.docked == false)
        {
          lines.push("Warning: Shields are down.");
        }
      }
      else
      {
        lines.pushRange(distressCalls.getItems());
      }
      
      if (quadrant.getNumberOfKlingons() == 0 && distressCalls.getLength() == 0 && this.energyRemaining < 300)
      {
        lines.push("Condition YELLOW: Low energy level, return to starbase.");
      }

      if (lines.getLength() == 1 && this.numberKlingonsRemaining > 0)
      {
        // If we've reached this point, then this is condition green locally, but there are still 
        // Klingons elsewhere.

        var message = "Condition GREEN: This quadrant is clear. ";
        if (this.numberKlingonsRemaining == 1)
        {
          message += "There is still 1 other Klingon ship in another quadrant.";
        }
        else
        {
          var args =  [ this.numberKlingonsRemaining ];
          message += formatter.format("There are still {0} Klingon ships in other quadrants.", args);
        }
        lines.push(message);
      }

      if (lines.getLength() > 1)
      {
        lines.push("");
      }

      return this.applyThemeToVerticalSpace(lines.getItems());
    }
    // GameState.getStandardWarnings function declaration - end

    // GameState.getShieldChangeReport function declaration - begin
    this.getShieldChangeReport = function(change)
    {
      var math = new CommonMath();
      var changeValue = math.convertStringToInt(change);

      var adding = false;
      var maxTransfer = 0;
      if (changeValue >= 0)
      {
        adding = true;
        maxTransfer = this.energyRemaining;
      }
      else
      {
        changeValue = -changeValue;
        adding = false;
        maxTransfer = this.shieldLevel;
      }

      var lines = new ManagedStringCollection();

      if (changeValue < 1 || changeValue > maxTransfer)
      {
        lines.push("");
        lines.push("Invalid amount of energy.");
        lines.push("");
        return lines.getItems();
      }

      lines.push("");
      if (adding)
      {
        this.energyRemaining -= changeValue;
        this.shieldLevel += changeValue;
      }
      else
      {
        this.energyRemaining += changeValue;
        this.shieldLevel -= changeValue;
      }

      var args =  [ this.shieldLevel, this.energyRemaining ];
      lines.push((new StringFormatter()).format("Shield strength is now {0}. Energy level is now {1}.", args));
      return lines.getItems();
    }
    // GameState.getShieldChangeReport function declaration - end

    // GameState.getShieldPrompt function declaration - begin
    this.getShieldPrompt = function()
    {
      var lines = new ManagedStringCollection();

      lines.pushRange(this.getPrompt());

      if (this.energyRemaining < 1 && this.shieldLevel < 1)
      {
        lines.pushRange(this.getCommandStrings());
        lines.push("");
        lines.push("Not enough energy to raise shields.");
        lines.push("");
        return lines.getItems();
      }

      lines.push("--- Shield Controls ----------------");
      if (this.energyRemaining >= 1)
      {
        var args =  [ this.energyRemaining ];
        lines.push((new StringFormatter()).format("Enter a positive value to increase shields (1 through {0}).", args));
      }
      if (this.shieldLevel >= 1)
      {
        var args =  [ -this.shieldLevel ];
        lines.push((new StringFormatter()).format("Enter a negative value to decrease shields (-1 through {0}).", args));
      }
      lines.push("");
      lines.push("Enter shield value: ");

      return lines.getItems();
    }
    // GameState.getShieldPrompt function declaration - end

    // GameState.getShieldResult function declaration - begin
    this.getShieldResult = function(change)
    {
      if (this.energyRemaining < 1 && this.shieldLevel < 1)
      {
        // The user has already been warned that the it is not possible raise sheilds.

        return new CommandTag("prompt", this.getFirstPrompt(), true);
      }

      return new CommandTag("prompt", this.getShieldChangeReport(change), false);
    }
    // GameState.getShieldResult function declaration - end

    // GameState.getShortRangeScan function declaration - begin
    this.getShortRangeScan = function()
    {
      var lines = new ManagedStringCollection();

      if (this.shortRangeScanDamage > 0)
      {
        lines.push("Short range scanner is damaged. Repairs are underway.");
        lines.push("");
      }
      else
      {
        var quadrant = this.allQuadrants.getItem(this.quadrantY, this.quadrantX);
        if (null != quadrant)
        {
          quadrant.scanned = true;
          lines.pushRange(this.getSectorReport(quadrant));
        }
      }

      return lines.getItems();
    }
    // GameState.getShortRangeScan function declaration - end

    // GameState.getStarbaseDirection function declaration - begin
    this.getStarbaseDirection = function()
    {
      var lines = new ManagedStringCollection();
      lines.push("");

      var quadrant = this.allQuadrants.getItem(this.quadrantY, this.quadrantX);
      if (null == quadrant || !quadrant.starbase)
      {
        lines.push("There are no starbases in this quadrant.");
      }
      else
      {
        var math = new CommonMath();

        var direction = math.calculateDirection(this.sectorX, this.sectorY, this.starbaseX, this.starbaseY);
        var directionFormatted = (new StringFormatter()).toFixed(direction, 2);

        var distance = math.calculateDistance(this.sectorX, this.sectorY, this.starbaseX, this.starbaseY) / 8;
        var distanceFormatted = (new StringFormatter()).toFixed(distance, 2);

        var args =  [ (this.starbaseX + 1), (this.starbaseY + 1) ];
        lines.push((new StringFormatter()).format("Starbase in sector [{0},{1}].", args));
        lines.push("Direction: " + directionFormatted);
        lines.push("Distance:  " + distanceFormatted);
      }
      lines.push("");

      return lines.getItems();
    }
    // GameState.getStarbaseDirection function declaration - end

    // GameState.getTargetingReport function declaration - begin
    this.getTargetingReport = function()
    {
      var lines = new ManagedStringCollection();

      lines.push("");
      if (this.klingonShips.getLength() == 0)
      {
        lines.push("There are no Klingon ships in this quadrant.");
        lines.push("");
        return lines.getItems();
      }

      var math = new CommonMath();

      for (var index = 0; index < this.klingonShips.getLength(); index++)
      {
        var ship = this.klingonShips.getItem(index);

        var direction = math.calculateDirection(this.sectorX, this.sectorY, ship.sectorX, ship.sectorY);
        var directionStr = (new StringFormatter()).toFixed(direction, 2);

        var args =  [ (ship.sectorX + 1), (ship.sectorY + 1), directionStr ];
        var instruction = (new StringFormatter()).format("Direction {2}: Klingon ship in sector [{0},{1}].", args);
        lines.push(instruction);
      }
      lines.push("");

      return lines.getItems();
    }
    // GameState.getTargetingReport function declaration - end

    // GameState.isDockingLocation function declaration - begin
    this.isDockingLocation = function(i,j)
    {
      for (var y = i - 1; y <= i + 1; y++)
      {
        for (var x = j - 1; x <= j + 1; x++)
        {
          // "" empty, "s" star, "k" klingon, "e" starship, "b" base
          if (this.currentSector.getItem(y, x) == "b")
          {
            return true;
          }
        }
      }
      return false;
    }
    // GameState.isDockingLocation function declaration - end

    // GameState.isSectorRegionEmpty function declaration - begin
    this.isSectorRegionEmpty = function(i,j)
    {
      for (var y = i - 1; y <= i + 1; y++)
      {
        // "" empty, "s" star, "k" klingon, "e" starship, "b" base
        if (this.currentSector.getItem(y, j - 1) != "" && this.currentSector.getItem(y, j + 1) != "")
        {
          return false;
        }
      }

      return this.currentSector.getItem(i, j) == "";
    }
    // GameState.isSectorRegionEmpty function declaration - end

    // GameState.moveStarship function declaration - begin
    this.moveStarship = function(direction,distance)
    {
      var lines = new ManagedStringCollection();

      if (distance < 0.1)
      {
        lines.push("Invalid warp factor.");
        lines.push("");
        return new CommandTag("prompt", lines.getItems(), false);
      }

      var maxWarpFactor = 8.0;
      if (this.navigationDamage > 0)
      {
        maxWarpFactor = 0.5;
      }

      var maxWarpFormatted = (new StringFormatter()).toFixed(maxWarpFactor, 1);

      if (distance > maxWarpFactor)
      {
        lines.push("Unable to comply. Warp engines damaged. Maximum warp factor: " + maxWarpFormatted);
        lines.push("");
        return new CommandTag("prompt", lines.getItems(), false);
      }

      var math = new CommonMath();

      distance *= 8;
      var energyRequired = math.convertFloatToInt(distance);
      if (energyRequired >= this.energyRemaining)
      {
        lines.push("Unable to comply. Insufficient energy to travel that speed.");
        lines.push("");
        return new CommandTag("prompt", lines.getItems(), false);
      }

      lines.push("STAR TREK - WARP ENGINES ENGAGED");
      lines.push("");
      this.energyRemaining -= energyRequired;

      var lastQuadX = this.quadrantX;
      var lastQuadY = this.quadrantY;
      var angle = -(math.pi() * (direction - 1.0) / 4.0);
      var x = this.quadrantX * 8 + this.sectorX;
      var y = this.quadrantY * 8 + this.sectorY;
      var dx = distance * math.cos(angle);
      var dy = distance * math.sin(angle);
      var vx = dx / 1000;
      var vy = dy / 1000;
      
      var quadX = 0;
      var quadY = 0;
      var sectX = 0;
      var sectY = 0;
      var lastSectX = this.sectorX;
      var lastSectY = this.sectorY;

      // "" empty, "s" star, "k" klingon, "e" starship, "b" base
      this.currentSector.setItem(this.sectorY, this.sectorX, "");

      var didEncounterObstacle = false;
      for (var i = 0; i < 1000; i++)
      {
        x += vx;
        y += vy;
        quadX = math.convertFloatToInt((math.convertFloatToInt(math.round(x))) / 8);
        quadY = math.convertFloatToInt((math.convertFloatToInt(math.round(y))) / 8);
        if (quadX == this.quadrantX && quadY == this.quadrantY)
        {
          sectX = (math.convertFloatToInt(math.round(x))) % 8;
          sectY = (math.convertFloatToInt(math.round(y))) % 8;

          if (sectX < 0 || sectX >= 8 || sectY < 0 || sectY >= 8)
          {
            this.sectorX = lastSectX;
            this.sectorY = lastSectY;

            // "" empty, "s" star, "k" klingon, "e" starship, "b" base
            this.currentSector.setItem(this.sectorY, this.sectorX, "e");
            
            lines.push("Encountered the frontier of Federation Space.");
            lines.push("");
            didEncounterObstacle = true;
            break;
          }

          // "" empty, "s" star, "k" klingon, "e" starship, "b" base
          if (this.currentSector.getItem(sectY, sectX) != "")
          {
            this.sectorX = lastSectX;
            this.sectorY = lastSectY;

            // "" empty, "s" star, "k" klingon, "e" starship, "b" base
            this.currentSector.setItem(this.sectorY, this.sectorX, "e");
            
            lines.push("Encountered obstacle within quadrant.");
            lines.push("");
            didEncounterObstacle = true;
            break;
          }

          lastSectX = sectX;
          lastSectY = sectY;
        }
      }

      if (didEncounterObstacle == false)
      {
        if (x < 0)
        {
          x = 0;
        }
        else if (x > 63)
        {
          x = 63;
        }

        if (y < 0)
        {
          y = 0;
        }
        else if (y > 63)
        {
          y = 63;
        }

        quadX = math.convertFloatToInt((math.convertFloatToInt(math.round(x))) / 8);
        quadY = math.convertFloatToInt((math.convertFloatToInt(math.round(y))) / 8);
        this.sectorX = (math.convertFloatToInt(math.round(x))) % 8;
        this.sectorY = (math.convertFloatToInt(math.round(y))) % 8;
        if (quadX != this.quadrantX || quadY != this.quadrantY)
        {
          this.quadrantX = quadX;
          this.quadrantY = quadY;
          this.generateSectorAtQuadrantXY();
        }
        else
        {
          this.quadrantX = quadX;
          this.quadrantY = quadY;

          // "" empty, "s" star, "k" klingon, "e" starship, "b" base
          this.currentSector.setItem(this.sectorY, this.sectorX, "e");
        }
      }

      if (this.isDockingLocation(this.sectorY, this.sectorX))
      {
        if (this.selectedScenario == 2)
        {
          this.energyRemaining = 3500;
          this.photonTorpedoes = 15;
        }
        else if (this.selectedScenario == 3)
        {
          this.energyRemaining = 9000;
          this.photonTorpedoes = 30;
        }
        else
        {
          this.energyRemaining = 3000;
          this.photonTorpedoes = 10;
        }

        this.navigationDamage = 0;
        this.shortRangeScanDamage = 0;
        this.longRangeScanDamage = 0;
        this.shieldControlDamage = 0;
        this.computerDamage = 0;
        this.photonDamage = 0;
        this.phaserDamage = 0;
        this.shieldLevel = 0;
        this.docked = true;
      }
      else
      {
        this.docked = false;
      }

      if (lastQuadX != this.quadrantX || lastQuadY != this.quadrantY)
      {
        this.timeRemaining--;
        this.stardate += 0.01;
      }

      lines.pushRange(this.getJoinedShortAndLongRangeScan());

      if (this.docked)
      {
        lines.push("Lowering shields as part of docking sequence...");
        lines.push("Starship successfully docked with starbase.");
        lines.push("");
      }
      else
      {
        var quadrant = this.allQuadrants.getItem(this.quadrantY, this.quadrantX);

        if (null != quadrant && quadrant.getNumberOfKlingons() > 0 && lastQuadX == this.quadrantX && lastQuadY == this.quadrantY)
        {
          lines.pushRange(this.generateKlingonAttack());
          lines.push("");
        }
        else
        {
          var repairReport = this.getDamageRepairReport();
          if (repairReport.length > 0)
          {
            lines.pushRange(repairReport);
          }
          else
          {
            lines.pushRange(this.generateDamage());
          }
        }
      }

      lines.pushRange(this.getCommandStrings());
      lines.push("");
      lines.push("Enter command: ");

      return new CommandTag("prompt", lines.getItems(), true);
    }
    // GameState.moveStarship function declaration - end

    // GameState.getClassDesignation function declaration - begin
    this.getClassDesignation = function(i,j)
    {
      for (var index = 0; index < this.klingonShips.getLength(); index++)
      {
        var ship = this.klingonShips.getItem(index);
        if (null != ship)
        {
          if (ship.sectorX == j && ship.sectorY == i)
          {
            return ship.classDesignation;
          }
        }
      }
      return "";
    }
    // GameState.getClassDesignation function declaration - end

    // GameState.createSectorRow function declaration - begin
    this.createSectorRow = function(row,suffix)
    {
      var rowText = "";

      for (var column = 0; column < 8; column++)
      {
        var i = row;
        var j = column;

        // "" empty, "s" star, "k" klingon, "e" starship, "b" base
        switch (this.currentSector.getItem(i, j))
        {
          case "":
            // "c" classic console, "s" suppa text, "p" pre oriented
            if (this.getTheme() == "s")
            {
              rowText += "---";
            }
            else
            {
              rowText += "   ";
            }
            break;

          case "e":
            rowText += "<E>";
            break;

          case "k":
            var shipIndicator = "";
            if (this.selectedScenario == 2 || this.selectedScenario == 3)
            {
              shipIndicator = this.getClassDesignation(i, j);
              if (shipIndicator == "")
              {
                shipIndicator = "+++";
              }
              else
              {
                shipIndicator = "+" + shipIndicator;
              }
            }
            else
            {
              shipIndicator = this.getKlingonShipIndicator();
            }
            rowText += shipIndicator;
            break;

          case "s":
            // "c" classic console, "s" suppa text, "p" pre oriented
            if (this.getTheme() == "s")
            {
              rowText += "-*-";
            }
            else
            {
              rowText += " * ";
            }
            break;

          case "b":
            rowText += ">!<";
            break;
        }
      }
      if (suffix != null)
      {
        rowText += suffix;
      }

      return rowText;
    }
    // GameState.createSectorRow function declaration - end

    // GameState.getPhaserPrompt function declaration - begin
    this.getPhaserPrompt = function()
    {
      var lines = new ManagedStringCollection();

      lines.pushRange(this.getPrompt());

      if (this.phaserDamage > 0) 
      {
        lines.pushRange(this.getCommandStrings());
        lines.push("");
        lines.push("Phasers are damaged. Repairs are underway.");
        lines.push("");
        return lines.getItems();
      }

      if (this.klingonShips.getLength() == 0) 
      {
        lines.pushRange(this.getCommandStrings());
        lines.push("");
        lines.push("There are no Klingon ships in this quadrant.");
        lines.push("");
        return lines.getItems();
      }

      lines.push("Phasers locked on target.");

      var args =  [ this.energyRemaining ];
      lines.push((new StringFormatter()).format("Enter phaser energy (1--{0}): ", args));
      return lines.getItems();
    }
    // GameState.getPhaserPrompt function declaration - end

    // GameState.getPhaserResult function declaration - begin
    this.getPhaserResult = function(phaserEnergy)
    {
      if (this.phaserDamage > 0 || this.klingonShips.getLength() == 0)
      {
        // The user has already been warned that the it is not possible to fire phasers.  So the 
        // user input line immediately following was just there to give the user time to read the
        // message.

        return new CommandTag("prompt", this.getFirstPrompt(), true);
      }

      return new CommandTag("prompt", this.firePhasers(phaserEnergy), false);
    }
    // GameState.getPhaserResult function declaration - end

    // GameState.getTorpedoPrompt function declaration - begin
    this.getTorpedoPrompt = function()
    {
      var lines = new ManagedStringCollection();

      lines.pushRange(this.getPrompt());

      if (this.photonDamage > 0)
      {
        lines.pushRange(this.getCommandStrings());
        lines.push("");
        lines.push("Photon torpedo control is damaged. Repairs are underway.");
        lines.push("");
        return lines.getItems();
      }

      if (this.photonTorpedoes == 0)
      {
        lines.pushRange(this.getCommandStrings());
        lines.push("");
        lines.push("Photon torpedoes exhausted.");
        lines.push("");
        return lines.getItems();
      }

      if (this.klingonShips.getLength() == 0)
      {
        lines.pushRange(this.getCommandStrings());
        lines.push("");
        lines.push("There are no Klingon ships in this quadrant.");
        lines.push("");
        return lines.getItems();
      }

      lines.pushRange(this.getNavChart());
      lines.push("");
      lines.pushRange(this.getTargetingReport());
      lines.push("");
      lines.push("Enter firing direction (1.0--9.0): ");

      return lines.getItems();
    }
    // GameState.getTorpedoPrompt function declaration - end

    // GameState.getNavChart function declaration - begin
    this.getNavChart = function()
    {
      var display = null;

      // "c" classic console, "s" suppa text, "p" pre oriented
      if (this.getTheme() == "s")
      {
        display = 
        [
          "..4..3..2..",
          "...\\.|./...",
          "....\\|/....",
          ".5--<E>--1.",
          "..../|\\....",
          ".../.|.\\...",
          "..6..7..8.."
        ];
      }
      else
      {
        display = 
        [
          " 4    3    2",
          "  `.  :  .' ",
          "    `.:.'   ",
          " 5---<E>---1",
          "    .':`.   ",
          "  .'  :  `. ",
          " 6    7    8"
        ];
      }

      return display;
    }
    // GameState.getNavChart function declaration - end

    // GameState.getTorpedoResult function declaration - begin
    this.getTorpedoResult = function(direction)
    {
      if (this.photonDamage > 0 || this.photonTorpedoes == 0 || this.klingonShips.getLength() == 0)
      {
        // The user has already been warned that the it is not possible to launch torpedos (see 
        // GetTorPrompt).  So the user input line immediately following was just there to give the
        // user time to read the message.

        return new CommandTag("prompt", this.getFirstPrompt(), true);
      }

      return new CommandTag("prompt", this.fireTorpedo(direction), false);
    }
    // GameState.getTorpedoResult function declaration - end

    // GameState.getWarpDirectionPrompt function declaration - begin
    this.getWarpDirectionPrompt = function()
    {
      var lines = new ManagedStringCollection();
      lines.pushRange(this.getPrompt());
      lines.pushRange(this.getNavChart());
      lines.push("");
      lines.push("");

      var maxWarpFactor = 8.0;
      if (this.navigationDamage > 0) 
      {
        maxWarpFactor = 0.5;
        var maxWarpFormatted = (new StringFormatter()).toFixed(maxWarpFactor, 1);

        lines.push("Warp engines damaged. Maximum warp factor: " + maxWarpFormatted);
        lines.push("");
      }

      lines.push("Enter course (1.0--9.0): ");
      return lines.getItems();
    }
    // GameState.getWarpDirectionPrompt function declaration - end

    // GameState.getWarpDirectionInputResult function declaration - begin
    this.getWarpDirectionInputResult = function(direction)
    {
      var math = new CommonMath();
      var directionValue = math.convertStringToFloat(direction);

      if (directionValue < 1.0 || directionValue > 9.0)
      {
        var errorLines = new ManagedStringCollection();
        errorLines.push("Invalid course.");
        errorLines.push("");
        return new CommandTag("prompt", errorLines.getItems(), false);
      }

      var maxWarpFactor = 8.0;
      if (this.navigationDamage > 0) 
      {
        maxWarpFactor = 0.5;
      }

      var maxWarpFormatted = (new StringFormatter()).toFixed(maxWarpFactor, 1);
      var warpFactorPrompt = (new StringFormatter()).format("Enter warp factor (0.1--{0}): ",  [ maxWarpFormatted ]);

      return new CommandTag("execmove", ["", warpFactorPrompt, ""], false);
    }
    // GameState.getWarpDirectionInputResult function declaration - end

    // GameState.getMoveResult function declaration - begin
    this.getMoveResult = function(direction,distance)
    {
      var math = new CommonMath();

      var directionValue = math.convertStringToFloat(direction);
      var distanceValue = math.convertStringToFloat(distance);

      return this.moveStarship(directionValue, distanceValue);
    }
    // GameState.getMoveResult function declaration - end

    // GameState.isInProgress function declaration - begin
    this.isInProgress = function()
    {
      return this.energyRemaining > 0 && this.destroyed == false && this.numberKlingonsRemaining > 0 && this.timeRemaining > 0;
    }
    // GameState.isInProgress function declaration - end

    // GameState.getCommandStrings function declaration - begin
    this.getCommandStrings = function()
    {
      var display = 
      [
        "--- Commands -----------------",
        "nav = Navigation",
        "pha = Phaser Control",
        "tor = Photon Torpedo Control",
        "she = Shield Control",
        "com = Access Computer",
        "xxx = Restart"
      ];
      return display;
    }
    // GameState.getCommandStrings function declaration - end

    // GameState.getComputerStrings function declaration - begin
    this.getComputerStrings = function()
    {
      var oppositeColor = null;
      if (this.isScreenGreen)
      {
        oppositeColor = "White";
      }
      else
      {
        oppositeColor = "Green";
      }

      var oppositeContrast = null;
      if (this.isScreenHighContrast)
      {
        oppositeContrast = "Low";
      }
      else
      {
        oppositeContrast = "High";
      }

      var display = 
      [
        "--- Main Computer --------------",
        "rec = Cumulative Galatic Record",
        "sta = Status Report",
        "bas = Starbase Calculator",
        "nav = Navigation Calculator",
        "col = Change Screen Color to " + oppositeColor,
        "con = Change Screen Contrast " + oppositeContrast,
      ];
      return display;
    }
    // GameState.getComputerStrings function declaration - end

    // GameState.getScenarioSelectionPrompt function declaration - begin
    this.getScenarioSelectionPrompt = function()
    {
      var scenarioArgs =  [ this.selectedScenario ];
      var formatter = new StringFormatter();
      var lastLine = formatter.format(" OR HIT 'RETURN' TO KEEP SELECTION (SCENARIO {0}):", scenarioArgs);

      var display = 
      [
       " STAR TREK - CUSTOMIZE SCENARIO",
       "",
       " SCENARIO 1 (EASY): Federation-Klingon Brush Wars",
       " ------------------------------------------------",
       " Command the U.S.S. Enterprise NCC-1701 to rid Federation ",
       " Space of encroaching Klingon D5 battle cruisers.",
       "",
       " SCENARIO 2 (MEDIUM): Klingon Attack on Archanis Sector!",
       "-------------------------------------------------------",
       " Command the U.S.S. Enterprise NCC-1701 to repell the Klingon ",
       " attempt to retake space ceded to the Federation, starting ",
       " with the Archanis Sector.  Klingons now using D5 and D6 ",
       " battle cruisers.",
       "",
       " SCENARIO 3 (DIFFICULT): Federation-Klingon War of 3198.0",
       " --------------------------------------------------------",
       " Command the U.S.S. Entente NCC-2120, a Federation Class ",
       " Dreadnought deployed to add firepower to the Constitution ",
       " Class Starships already patrolling the Klingo-Federation ",
       " border.  Klingons now using D5, D6, and D7 battle cruisers.",
       "",
       " TYPE 1, 2, OR 3 TO SELECT A SCENARIO, ",
       lastLine
      ];

      return this.applyThemeToVerticalSpace(display);
    }
    // GameState.getScenarioSelectionPrompt function declaration - end

    // GameState.syncToScenario function declaration - begin
    this.syncToScenario = function()
    {
      // Apply scenario specific settings.

      var math = new CommonMath();

      this.numberKlingonsRemaining = 15 + math.randomNext(6);
      this.timeRemaining = 40 + math.randomNext(10);

      var maxKlingonsPerQuadrant = 3;
      if (this.selectedScenario == 2)
      {
        this.stardate = math.randomNextDouble() * 2.0 + 2256.0;
        this.energyRemaining = 3500;
        this.photonTorpedoes = 15;
        maxKlingonsPerQuadrant = 4;
        this.numberKlingonsRemaining *= 2;
        this.timeRemaining *= 2;
      }
      else if (this.selectedScenario == 3)
      {
        this.stardate = math.randomNextDouble() / 2.0 + 3198.0;
        this.energyRemaining = 9000;
        this.photonTorpedoes = 30;
        maxKlingonsPerQuadrant = 4;
        this.numberKlingonsRemaining *= 3;
        this.timeRemaining *= 2;
      }
      else
      {
        this.stardate = math.randomNextDouble() * 5.0 + 2245.0;
        this.energyRemaining = 3000;
        this.photonTorpedoes = 10;
        maxKlingonsPerQuadrant = 3;
      }

      // Since we just changed this.numberKlingonsRemaining, wipe all previously allocated 
      // var.klingons values.

      for (var i = 0; i < 8; i++)
      {
        for (var j = 0; j < 8; j++)
        {
          var quadrant = this.allQuadrants.getItem(i, j);
          if (null != quadrant)
          {
            quadrant.clearKlingons();
          }
        }
      }

      // Populate new Quadrant.klingons values.

      var klingonCount = this.numberKlingonsRemaining;
      while (klingonCount > 0)
      {
        var i = math.randomNext(8);
        var j = math.randomNext(8);

        var quadrant = this.allQuadrants.getItem(i, j);
        if (null != quadrant)
        {
          if (quadrant.getNumberOfKlingons() < maxKlingonsPerQuadrant)
          {
            quadrant.addRandomKlingon(this.selectedScenario);
            klingonCount--;
          }
        }
      }

      // Any time Quadrant.klingons values change, we have to regenerate the current quadrant to
      // ensure that the quadrant state as displayed is consistent with this.allQuadrants.
      
      this.generateSectorAtQuadrantXY();
    }
    // GameState.syncToScenario function declaration - end

    // NOTE: The method calls below MUST be called after function decls in javascript.
    
    this.selectedScenario = 1;
    this.syncToScenario();
  }
  // end of class GameState  ///////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // class TrekApp  ////////////////////////////////////////////////////////////
  function TrekApp()
  {
    this.currentUserCommand = null;
    this.gameState = new GameState();
    this.history = new ManagedStringCollection();

    // TrekApp.isScreenGreen function declaration - begin
    this.isScreenGreen = function()
    {
      return this.gameState.isScreenGreen;
    }
    // TrekApp.isScreenGreen function declaration - end

    // TrekApp.isScreenHighContrast function declaration - begin
    this.isScreenHighContrast = function()
    {
      return this.gameState.isScreenHighContrast;
    }
    // TrekApp.isScreenHighContrast function declaration - end

    // TrekApp.createGameStateKeepSettings function declaration - begin
    this.createGameStateKeepSettings = function()
    {
      var newGameState = new GameState();

      if (null != this.gameState)
      {
        newGameState.selectedScenario = this.gameState.selectedScenario;
        newGameState.syncToScenario();

        newGameState.isScreenGreen = this.gameState.isScreenGreen;
        newGameState.isScreenHighContrast = this.gameState.isScreenHighContrast;
      }

      return newGameState;
    }
    // TrekApp.createGameStateKeepSettings function declaration - end

    // TrekApp.shouldClearBeforePrompt function declaration - begin
    this.shouldClearBeforePrompt = function()
    {
      if (null == this.currentUserCommand)
      {
        return true;
      }
      return this.currentUserCommand.clear;
    }
    // TrekApp.shouldClearBeforePrompt function declaration - end

    // TrekApp.prompt function declaration - begin
    this.prompt = function()
    {
      if (null == this.currentUserCommand)
      {
        return this.getTitleStrings();
      }
      return this.currentUserCommand.output;
    }
    // TrekApp.prompt function declaration - end

    // TrekApp.applyUserInput function declaration - begin
    this.applyUserInput = function(userInput)
    {
      var previousCommandTagLabel = null;
      if (null == this.currentUserCommand)
      {
        previousCommandTagLabel = "needinst";
      }
      else
      {
        previousCommandTagLabel = this.currentUserCommand.label;
      }

      this.currentUserCommand = this.getNextCommandTag(previousCommandTagLabel, userInput);

      this.history.push(userInput);

      if (this.history.getLength() > 5)
      {
        this.history.removeFirst();
      }
    }
    // TrekApp.applyUserInput function declaration - end

    // TrekApp.getNextCommandTag function declaration - begin
    this.getNextCommandTag = function(previousCommandTagLabel,userInput)
    {
      if (null == previousCommandTagLabel || "" == previousCommandTagLabel)
      {
        previousCommandTagLabel = "needinst";
      }

      var tag = null;
      switch (previousCommandTagLabel)
      {
        case "needinst":
          if (null == userInput || "yes" != (new StringFormatter()).getStanardizedInput(userInput))
          {
            tag = new CommandTag("custscenario", this.getCustomizeScenarioPrompt(), true);
          }
          else
          {
            tag = new CommandTag("instruc0", this.getInstructionsPage0(), true);
          }
          break;

        case "custscenario":
          if (null == userInput || "yes" != (new StringFormatter()).getStanardizedInput(userInput))
          {
            tag = new CommandTag("mission", this.gameState.getMission(), true); break;
          }
          else
          {
            tag = new CommandTag("getscenario", this.gameState.getScenarioSelectionPrompt(), true);
          }
          break;

        case "compprompt": tag = this.gameState.getComputerFirstResponse(userInput); break;
        case "execmove": tag = this.gameState.getMoveResult(this.history.getLastValue(), userInput); break;
        case "execnavcalc": tag = new CommandTag("prompt", this.gameState.getNavCalcResult(this.history.getLastValue(), userInput), false); break;
        case "execphas": tag = this.gameState.getPhaserResult(userInput); break;
        case "execshield": tag = this.gameState.getShieldResult(userInput); break;
        case "exectorp": tag = this.gameState.getTorpedoResult(userInput); break;
        case "getnavcalcx": tag = this.gameState.getNavCalcInputResult(userInput); break;
        case "getscenario": tag = this.gameState.setMission(userInput); break;
        case "getwarpdir": tag = this.gameState.getWarpDirectionInputResult(userInput); break;
        case "instruc0": tag = new CommandTag("instruc1", this.getInstructionsPageSrs(), true); break;
        case "instruc1": tag = new CommandTag("instruc2", this.getInstructionsPageLrs(), true); break;
        case "instruc2": tag = new CommandTag("instruc3", this.getInstructionsPage1(), true); break;
        case "instruc3": tag = new CommandTag("instruc4", this.getInstructionsPage1a(), true); break;
        case "instruc4": tag = new CommandTag("instruc5", this.getInstructionsPage4(), true); break;
        case "instruc5": tag = new CommandTag("instruc6", this.getInstructionsPage5(), true); break;
        case "instruc6": tag = new CommandTag("instruc7", this.getInstructionsPage6(), true); break;
        case "instruc7": tag = new CommandTag("instruc8", this.getInstructionsPage8(), true); break;
        case "instruc8": tag = new CommandTag("mission", this.gameState.getMission(), true); break;

        case "mission":
          if (null != userInput && "xxx" == (new StringFormatter()).getStanardizedInput(userInput))
          {
            this.gameState = this.createGameStateKeepSettings();
            return new CommandTag("needinst", this.getTitleStrings(), true);
          }
          else
          {
            tag = this.gameState.getPromptResult(userInput);
          }
          break;

        case "prompt":
          if (null != userInput && "xxx" == (new StringFormatter()).getStanardizedInput(userInput))
          {
            this.gameState = this.createGameStateKeepSettings();
            return new CommandTag("needinst", this.getTitleStrings(), true);
          }
          else
          {
            tag = this.gameState.getPromptResult(userInput);
          }
          break;

        case "typexxx":
          if (null != userInput && "xxx" == (new StringFormatter()).getStanardizedInput(userInput))
          {
            this.gameState = this.createGameStateKeepSettings();
            return new CommandTag("needinst", this.getTitleStrings(), true);
          }
          else
          {
            tag = new CommandTag("typexxx",  [ ], false);
          }
          break;
      }

      if ("typexxx" != previousCommandTagLabel && null != tag)
      {
        var eogStatus = this.gameState.getEndOfGameStatus();
        if (!this.gameState.isInProgress() || (null != eogStatus && eogStatus.length > 0))
        {
          tag.label = "typexxx";
          tag.clear = false;

          var lines = new ManagedStringCollection();
          if (null != tag.output)
          {
            lines.pushRange(tag.output);
          }
          if (null != eogStatus && eogStatus.length > 0)
          {
            lines.pushRange(eogStatus);
          }
          lines.push("");
          lines.push("TYPE 'XXX' TO PLAY AGAIN");
          lines.push("");
          tag.output = lines.getItems();
        }
      }

      if (null == tag)
      {
        this.gameState = this.createGameStateKeepSettings();
        return new CommandTag("needinst", this.getTitleStrings(), true);
      }

      return tag;
    }
    // TrekApp.getNextCommandTag function declaration - end

    // TrekApp.getTitleStringsBase function declaration - begin
    this.getTitleStringsBase = function()
    {
      var display = null;

      if (this.gameState.getTheme() == "p")
      {
        // "c" classic console, "s" suppa text, "p" pre oriented

        display = 
        [
"                                           ,:,                                                ,:~?II=~=IIIIIIIIIIIIIIIIIIIIIIIII77IIII77IIII7IIII7II", //777III77IIIII7I77III????????++++++====??II??======~",
"  the STAR TREK text video game         ~??III?I?+                                          :~~~~=77~:~77777777777777I7I7777777777II77II777777777777", //777777777777777777777II7777777I777II7I77III7+++++=",
"                                    +?IIII??II?IIII+IIIIIII+                                :~~==+??:,,????????????++~=?========================~===", //======++++++++++?+++++++++????????======????~~~777",
"                         ~:?I????I?IIIIIIIIII???IIIIIIIIIII?I??~                             :~~~=+=+??+++++=+++++=++=++==++++++++++++++++++++++++++", //++++++++==++=+++++++=======+===============+: ::",
" +++++++????????????IIIIIIIIIIII7777777777777777777777777777IIIIIIIIIIIIIIII???????????~~~,         :::::::            ::::::::",                                                                         
"  +++++++?? ????????IIIIIIIIIIII7777777777777777777777777777IIIIIIIIIII?II???+?=??????::~~                             :IIIIII~",
"                             ,?I?I+IIIIIIII ?+I?II+?II?IIII=     :::::~=~=~~~~====~~=~~~~                              :IIIIII~",
"                                  +????II?IIIIIIIII????,            :+=++?IIII?IIIII?II+?II~                           :IIIIII~",
"                                        ~++++++++=                      :????I??I?IIIIIIIIIII?:                        :IIIIII~",
"                                                                            ?????IIIIIIIIIIIIIII?                      :IIIIII~",
"                                                                               =????I?IIIIIIIIIIII?:                   :IIIIII~",
"                                                                              +I?IIIIIIIIIII????+++???:                :IIIIII~",
"                                                                        ?II?+II7I77777777777777777777777777777777777IIIIII?III++~:,       ,:",                                                            
"                                                                    +  +7777I7?7I7777777777?II77777777777777777777777777++===~=7777I777777777",
"  Original Star Trek .. Mike Mayfield 1971                          ?: +II?+++=++++++++++?III?IIIIIIIIIIIIIIIIIIIIIII7IIII77IIII7777? ?,7777II+",
"  Super Star Trek ..... Bob Leedom 1976                             == =??======?+~=~?~=========+??????+???????+????????+?+?????????IIIIIIII?I~",
"  curly brace port .... Michael Birken 2008                         =  =+++==+==++=++++?++++++++++++++++++++++++??+++?++?+?+??+??????+,",
"  javascript port ..... Eric Friedrichsen 2011                         :====~=~=======================================++++++++=++",
"                                                                          ~~:~:~~~~~~~~~~~~~~~~~~~~~~~~~~~~=~~~~~~:",
        ];
      }
      else if (this.gameState.getTheme() == "s")
      {
        // "c" classic console, "s" suppa text, "p" pre oriented

        display = 
        [
          "----------?MMMMMMMM:-MMMMMMMMMMM--MMMMMMMMM---MMMMMMMMNM,---------MMMMMMMMMM+-MMMMMMMMMMN----NMMMMMNMM-NMMMM--MMMMM-----",
          "---------MMMMMMMMMMM-7MMMMMMMMMDNMMMMMMMMMM7-:MMMMMMMONMM---------NMMMMM88MMM-MMMMMMMMOMDM--MMMMMMMMM-,MNMM:-MMMMM------",
          "--------MMMMMMMMMMMM+MMMMMMMMMM-MMMMMMMMMMM7-NMMMNMMMNMMM--------MMMMMMMMDMN,,MMMMMMMMNMMM-MMMMMMMMMM-OMMMM-MMMMM,------",
          "--------MMMM---MMMMZ---MMMMM---MMMMN---MMMM--M8MM---MMMMM-----------NMMMM----MMMMN---NMMM:-MMMMM------MMMM=MMOMN--------",
          "-------MMMMM---MMNM----MMMM----MMMMN--MMMMM-8MMMM---MMMM------------MMMM:----MMMM:--MMMMM-,MMZM------?MMMMMMMMM---------",
          "-------MMMMN--MMM+----MMMMM---,MMMM---MMMM,-MMMM$--MMMMM-----------MMMMM----MMMMD---MMNMO-MMMMM------MMMMMMMMM----------",
          "-------MMMM------,~---MMMMM---MMMMM--ZMMMM-~MMMM---MMMM------------MM7MM----MMNOM--,NMMM--MMZM~------MMMMMMMM-----------",
          "------MMMMM--NMMMM---,MMMM----MMMN--8MMMMM-MMMMM-:MMMMM-----------:MMMM----=MMMM--MMMMMM-OMMMM--MM$-MMMMMMMM------------",
          "------MMMMMMMMMMMM---NMMMM---OMMMMMMMMMMM--MMMMMMMMMMM:-----------MMMMM----ZMMMMMMMMMMM--MMNMMMMMM=-MMMMMMMM------------",
          "-----$MMMMMMMMMMM----MOMM----MMMMMMMMMMMM-NMMMMMMMMMM-------------MMMM,----MMMMMMMMMMM--:MMMMMMMMM,7MMMMMMMMI-----------",
          "-----MMMMMMMMMMMM---8MNMM---~MMMMMM8DMNM--MMMMMMMM,--------------MMMMM----MMMMMMMMM-----MMMMM8MM---MMMMMMMMMM-----------",
          "----,MMM?---MMMM,---MMMMO---MMMMM--,MMMM--MMMMMMMMI--------------MMMMM----MMMMMMMMM-----MMMMN------MMMMMMMMMM-----------",
          "-----------:MMMM---~NMMM----MMMM:--MMMMM-MMMMMMMMMM-------------+MMMM----?MMMMMDMMM----DMMMD------MNMMM-MMMMN-----------",
          "-----MMM:--MMMMM---MMMMM---OMNMM---MMMM--MMMM-MMMMM-------------MMMMM----MMMMM$MMMM=---MMMMM------IMMMM-MMMNM-----------",
          "---OMMMM---MMMM----MMMN,---MMMMZ--NMMMM-MMMMM-MMMMM-------------MMMM7----MMMM7-MMMMM---MMMM------8MMMM--MMMMM-----------",
          "---MMMM$--MMNMM---8MMMM----MMMM---MMMMI-MMMNM-NMMMM------------MMMMM----MMMMM--MMMMM--MMDNM------MMMMM--$MMMM-----------",
          "---MMMDMMMMMMMO---MMMM7---DMMNM--=MMMM--MMMM--DMMMM------------MMMMM----MMMMM--MMMMM--MMMMMMMMM--MMNM~---MMMM,----------",
          "---DMMMMMMMMN8----MMMM----MMMM,--MMMMM-MMMMM--,MMMMI-----------MMMM-----MMMM---MMMMM-MMMMMMMMMM-DNMMM----MMMMD----------",
          "---MMMMMMMMM-----MMMMM---DMM7M---MMMM--MMNM----MMMMM----------MMMMM----MMMMM---MMMMM-MMMMMMMMM+-MMMMD----MMMMM----------",
          "-----------------------------------------------------------------------------------------the STAR TREK text video game--",
          "Original Star Trek .. Mike Mayfield 1971",
          "Super Star Trek ..... Bob Leedom 1976",
          "curly brace port .... Michael Birken 2008",
          "javascript port ..... Eric Friedrichsen 2011",
        ];
      }
      else
      {
        // "c" classic console, "s" suppa text, "p" pre oriented

        display = 
        [
          "     ______ _______ ______ ______    _______ ______  ______ __  __ ",
          "    / __  //__  __// __  // __  /   /__  __// __  / / ____// / / /",
          "   / / /_/   / /  / /_/ // /_/ /      / /  / /_/ / / /__  / // /",
          "   _\\ \\     / /  / __  //   __/      / /  /   __/ / __ / /   / ",
          " / /_/ /   / /  / / / // /\\ \\       / /  / /\\ \\  / /___ / /\\ \\",
          "/_____/   /_/  /_/ /_//_/  \\_\\     /_/  /_/  \\_\\/_____//_/  \\_\\",
          "",
          "___________________          _-_           ",
          "\\__(==========/_=_/ ____.---'---`---.____  Original Star Trek .. Mike Mayfield 1971",
          "            \\_ \\    \\----._________.----/  Super Star Trek ..... Bob Leedom 1976",
          "              \\ \\   /  /    `-_-'          curly brace port .... Michael Birken 2008",
          "          __,--`.`-'..'-_                  javascript port ..... Eric Friedrichsen 2011",
          "         /____          ||                 ",
          "              `--.____,-'                  ",
          "",
          "DO YOU NEED INSTRUCTIONS (YES/NO) "
        ];
      }

      var titleLines = new ManagedStringCollection();
      titleLines.pushRange(display);
      return titleLines;
    }
    // TrekApp.getTitleStringsBase function declaration - end

    // TrekApp.getTitleStrings function declaration - begin
    this.getTitleStrings = function()
    {
      var lines = this.getTitleStringsBase();
      lines.push("DO YOU NEED INSTRUCTIONS (YES/NO) ");
      return this.gameState.applyThemeToVerticalSpace(lines.getItems());
    }
    // TrekApp.getTitleStrings function declaration - end

    // TrekApp.getCustomizeScenarioPrompt function declaration - begin
    this.getCustomizeScenarioPrompt = function()
    {
      var lines = this.getTitleStringsBase();
      lines.push("DO YOU WANT TO CUSTOMIZE YOUR SCENARIO (YES/NO) ");
      return this.gameState.applyThemeToVerticalSpace(lines.getItems());
    }
    // TrekApp.getCustomizeScenarioPrompt function declaration - end

    // TrekApp.getInstructionsPage0 function declaration - begin
    this.getInstructionsPage0 = function()
    {
      var display =  
      [
        " INSTRUCTIONS FOR ** STAR TREK ** ",
        "",
        " THE GALAXY IS DIVIDED INTO AN 8 X 8 QUADRANT GRID, AND EACH",
        " QUADRANT IS FURTHER DIVIDED INTO AN 8 X 8 SECTOR GRID.",
        "",
        " YOU WILL BE ASSIGNED A STARTING POINT SOMEWHERE IN THE GALAXY",
        " TO BEGIN A TOUR OF DUTY AS COMMANDER OF A STARSHIP;",
        " YOUR MISSION: TO SEEK AND DESTROY THE FLEET OF KLINGON WARSHIPS",
        " WHICH ARE MENACING THE UNITED FEDERATION OF PLANETS.",
        "",
        " (TO CONTINUE, HIT 'RETURN')"
      ];
      return this.gameState.applyThemeToVerticalSpace(display);
    }
    // TrekApp.getInstructionsPage0 function declaration - end

    // TrekApp.getInstructionsPage1 function declaration - begin
    this.getInstructionsPage1 = function()
    {
      var display = 
      [
        " INSTRUCTIONS FOR ** STAR TREK ** ",
        "",
        " commands",
        " --------",
        " YOU HAVE THE FOLLOWING TEXT COMMANDS AVAILABLE TO YOU AS THE ",
        " CAPTAIN OF A STARSHIP:",
        "",
        " nav = Navigation",
        " pha = Phaser Control",
        " tor = Photon Torpedo Control",
        " she = Shield Control",
        " com = Access Computer",
        " xxx = Restart",
        "",
        " (TO CONTINUE, HIT 'RETURN')"
      ];
      return this.gameState.applyThemeToVerticalSpace(display);
    }
    // TrekApp.getInstructionsPage1 function declaration - end

    // TrekApp.getInstructionsPage1a function declaration - begin
    this.getInstructionsPage1a = function()
    {
      var lines = new ManagedStringCollection();
      lines.push(" INSTRUCTIONS FOR ** STAR TREK ** ");
      lines.push("");
      lines.push(" nav = Navigation");
      lines.push(" ----------------");
      lines.push(" COURSE IS IN A CIRCULAR NUMERICAL VECTOR ARRANGEMENT AS SHOWN . . .");
      lines.push("");
      lines.pushRange(this.gameState.getNavChart());
      lines.push("");
      lines.push(" INTEGER AND REAL VALUES MAY BE USED. (1.5 IS HALF- WAY BETWEEN 1 AND 2.)");
      lines.push(" VALUES MAY APPROACH 9.0, WHICH ITSELF IS EQUIVALENT TO 1.0.");
      lines.push("");
      lines.push(" ONE WARP FACTOR IS THE SIZE OF ONE QUADRANT. THEREFORE, TO GET");
      lines.push(" FROM QUADRANT 6,5 TO 5,5, YOU WOULD USE COURSE 3, WARP FACTOR 1.");
      lines.push("");
      lines.push(" (TO CONTINUE, HIT 'RETURN')");

      return this.gameState.applyThemeToVerticalSpace(lines.getItems());
    }
    // TrekApp.getInstructionsPage1a function declaration - end

    // TrekApp.getInstructionsPageSrs function declaration - begin
    this.getInstructionsPageSrs = function()
    {
      var display = null;

      var kIndicator = this.gameState.getKlingonShipIndicator();

      // "c" classic console, "s" suppa text, "p" pre oriented
      if (this.gameState.getTheme() == "s")
      {
        display = 
        [
          " INSTRUCTIONS FOR ** STAR TREK ** ",
          "",
          "SHORT RANGE SCAN -----------------------------------------",
          "-=--=--=--=--=--=--=--=- ----------- Region: Arcturus II -",
          "------------------------ --------- var: [6,7] -------",
          "----------*------->!<--- ----------- Sector: [3,6] -------",
          "------------------------ --------- Stardate: 2257 --------",
          "-------*-----*---------- --- Time remaining: 48 ----------",
          "------------------------ -------- Condition: RED ---------",
          "------<E>--------------- ----------- Energy: 1500 --------",
          "-------*-------" + kIndicator + "----*- ---------- Shields: 1500 --------",
          "------------------------ - Photon Torpedoes: 10 ----------",
          "-=--=--=--=--=--=--=--=- ----------- Docked: false -------",
          "",
          " SYMBOLOGY ON YOUR SENSOR SCREEN IS AS FOLLOWS:",
          "",
          " <E> = YOUR STARSHIP'S POSITION",
          " " + kIndicator + " = KLINGON BATTLE CRUISER",
          " >!< = FEDERATION STARBASE (REFUEL/REPAIR/RE-ARM HERE!)",
          " * = STAR",
          "",
          " (TO CONTINUE, HIT 'RETURN')"
        ];
      }
      else
      {
        display = 
        [
          " INSTRUCTIONS FOR ** STAR TREK ** ",
          "",
          " SHORT RANGE SCAN",
          " ----------------",
          " SHOWS YOU A SCAN OF YOUR PRESENT QUADRANT...",
          "",
          " -=--=--=--=--=--=--=--=-             Region: Quadra Sigma III",
          "                                    var: [7,6]",
          "              *     * >!<             Sector: [4,6]",
          "    " +  kIndicator + "                             Stardate: 2283",
          "  *                           Time remaining: 42",
          "                                   Condition: RED",
          "          <E>       *                 Energy: 2997",
          "     *                               Shields: 0",
          "     *                      Photon Torpedoes: 10",
          " -=--=--=--=--=--=--=--=-             Docked: False",
          "",
          " SYMBOLOGY ON YOUR SENSOR SCREEN IS AS FOLLOWS:",
          "",
          " <E> = YOUR STARSHIP'S POSITION",
          " " + kIndicator + " = KLINGON BATTLE CRUISER",
          " >!< = FEDERATION STARBASE (REFUEL/REPAIR/RE-ARM HERE!)",
          " * = STAR",
          "",
          " (TO CONTINUE, HIT 'RETURN')"
        ];
      }

      return this.gameState.applyThemeToVerticalSpace(display);
    }
    // TrekApp.getInstructionsPageSrs function declaration - end

    // TrekApp.getInstructionsPageLrs function declaration - begin
    this.getInstructionsPageLrs = function()
    {
      var leftSpacer = null;
      var rightSpacer = null;

      // "c" classic console, "s" suppa text, "p" pre oriented
      if (this.gameState.getTheme() == "s" || this.gameState.getTheme() == "p")
      {
        leftSpacer = "(";
        rightSpacer = ")";
      }
      else
      {
        leftSpacer = "·";
        rightSpacer = "·";
      }

      var display = 
      [
        " INSTRUCTIONS FOR ** STAR TREK ** ",
        "",
        " LONG RANGE SCAN",
        "----------------",
        " SHOWS CONDITIONS IN SPACE FOR ONE QUADRANT ON EACH SIDE",
        " OF YOUR STARSHIP (WHICH IS IN THE MIDDLE OF THE SCAN)",
        "",
        " -------------------",
        " | 000 | 005 | 115 |",
        " -------------------",
        " | 000 |"+ leftSpacer + "112" + rightSpacer + "| 113 |",
        " -------------------",
        " | 000 | 008 | 117 |",
        " -------------------",
        "",
        " THE SCAN IS CODED IN THE FORM '###'. WHERE THE UNITS DIGIT",
        " IS THE NUMBER OF STARS, TENS DIGIT IS THE NUMBER OF STARBASES,",
        " AND HUNDREDS DIGIT IS THE NUMBER OF KLINGONS.",
        " EXAMPLE -- 117 = 1 KLINGON, 1 STARBASE, 7 STARS.",
        "",
        " YOUR POSITION IS INDICATED BY THE " + leftSpacer + rightSpacer + ".",
        "",
        " (TO CONTINUE, HIT 'RETURN')"
      ];

      return this.gameState.applyThemeToVerticalSpace(display);
    }
    // TrekApp.getInstructionsPageLrs function declaration - end

    // TrekApp.getInstructionsPage4 function declaration - begin
    this.getInstructionsPage4 = function()
    {
      var display = 
      [
        " INSTRUCTIONS FOR ** STAR TREK ** ",
        "",
        " pha = Phaser Control",
        " --------------------",
        " ALLOWS YOU TO DESTROY THE KLINGON BATTLE CRUISERS BY",
        " ZAPPING THEM WITH SUITABLY LARGE UNITS OF ENERGY TO",
        " DEPLETE THEIR SHIELD POWER. (REMEMBER, KLINGONS HAVE",
        " PHASERS, TOO!)",
        "",
        " (TO CONTINUE, HIT 'RETURN')"
      ];
      return this.gameState.applyThemeToVerticalSpace(display);
    }
    // TrekApp.getInstructionsPage4 function declaration - end

    // TrekApp.getInstructionsPage5 function declaration - begin
    this.getInstructionsPage5 = function()
    {
      var display = 
      [
        " INSTRUCTIONS FOR ** STAR TREK ** ",
        "",
        " tor = Photon Torpedo Control",
        " ----------------------------",
        " TORPEDO COURSE IS THE SAME AS USED IN WARP ENGINE CONTROL.",
        " IF YOU HIT THE KLINGON VESSEL, HE IS DESTROYED AND",
        " CANNOT FIRE BACK AT YOU. IF YOU MISS, YOU ARE SUBJECT TO",
        " HIS PHASER FIRE.",
        "",
        " (TO CONTINUE, HIT 'RETURN')"
      ];
      return this.gameState.applyThemeToVerticalSpace(display);
    }
    // TrekApp.getInstructionsPage5 function declaration - end

    // TrekApp.getInstructionsPage6 function declaration - begin
    this.getInstructionsPage6 = function()
    {
      var display = 
      [
        " INSTRUCTIONS FOR ** STAR TREK ** ",
        "",
        " she = Shield Control",
        " --------------------",
        " DEFINES NUMBER OF ENERGY UNITS TO BE ASSIGNED TO SHIELDS.",
        " ENERGY IS TAKEN FROM TOTAL SHIP'S ENERGY. NOTE THAT THE",
        " TOTAL ENERGY INCLUDES SHIELD ENERGY.",
        "",
        " (TO CONTINUE, HIT 'RETURN')"
      ];
      return this.gameState.applyThemeToVerticalSpace(display);
    }
    // TrekApp.getInstructionsPage6 function declaration - end

    // TrekApp.getInstructionsPage8 function declaration - begin
    this.getInstructionsPage8 = function()
    {
      var display = 
      [
        " INSTRUCTIONS FOR ** STAR TREK ** ",
        "",
        " com = Access Computer",
        " ---------------------",
        " THE LIBRARY-COMPUTER CONTAINS SEVERAL OPTIONS AND SETTINGS:",
        "",
        " rec = Cumulative Galatic Record",
        " sta = Status Report",
        " bas = Starbase Calculator",
        " nav = Navigation Calculator",
        " col = Change Screen Color",
        " con = Change Screen Contrast",
        "",
        " (TO CONTINUE, HIT 'RETURN')"
      ];
      return this.gameState.applyThemeToVerticalSpace(display);
    }
    // TrekApp.getInstructionsPage8 function declaration - end
  }
  // end of class TrekApp  /////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // class Trek  ///////////////////////////////////////////////////////////////
  var trekApp;
  var controller1;

  function Trek()
  {
    this.ready = function(target) 
    {
      trekApp = new TrekApp();
      
      var console1 = $('<pre class="console1">');
      $(target).append(console1);
      controller1 = console1.console({
        promptLabel: '> ',
        commandValidate:function(line)
        {
          return true;
        },
        commandHandle:function(line)
        {
          trekApp.applyUserInput(line);

          var color = "jquery-console-message-value";
          if (trekApp.isScreenHighContrast())
          {
            if (trekApp.isScreenGreen())
            {
              color = "jquery-console-message-bright-green";
            }
            else
            {
              color = "jquery-console-message-bright";
            }
          }
          else
          {
            if (trekApp.isScreenGreen())
            {
              color = "jquery-console-message-green";
            }
            else
            {
              color = "jquery-console-message-value";
            }
          }

          if (trekApp.shouldClearBeforePrompt())
          {
            controller1.quickReset();
          }
          var promptStrings = trekApp.prompt();
          promptStrings.push("");
          
          var prompt = new Array();
          for (var i=0; i < promptStrings.length; i++)
          {
            prompt.push({msg:promptStrings[i], className:color });
          }
          return prompt;
        },
        autofocus:true,
        animateScroll:true,
        promptHistory:true
      });
      controller1.banner(trekApp.getTitleStrings());
    };
  }
  // end of class Trek  ////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //
  // trek.js 1.0
  // 2011.01.07 11:55:39 AM