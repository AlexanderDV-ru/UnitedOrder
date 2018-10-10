function getUnits(region)
{
	sendRequest("get", "/getunitsbyregion", "region=" + region, function(text)
	{
		var unitsNames = JSON.parse(text)
		document.getElementById("unitSelect").innerHTML = ""
		function func(name)
		{
			var child = document.createElement("option")
			child.textContent = name
			child.onclick = function()
			{
				getUnitInfo(name)
			}
			document.getElementById("unitSelect").appendChild(child)
		}
		for (var v = 0; v < unitsNames.length; v++)
			func(unitsNames[v])
		document.getElementById("unitSelect").focus()
	})
}

function getUnitInfo(name)
{
	sendRequest("get", "/getunitinfo", "name=" + name, function(text)
	{
		var unitInfo = JSON.parse(text)
		document.getElementById("unitInfo").innerHTML = ""
		function func(prop)
		{
			var tr = document.createElement("tr")

			var label = document.createElement("td")
			label.textContent = getMsg(prop.name)
			tr.appendChild(label)

			var value = document.createElement("td")
			if (prop.editable)
			{
				var input = document.createElement("input")
				input.value = prop.value
				value.appendChild(input)
			}
			else
			{
				var div = document.createElement("div")
				div.textContent = prop.value
				value.appendChild(div)
			}
			tr.appendChild(value)

			document.getElementById("unitInfo").appendChild(tr)
		}
		for (var v = 0; v < unitInfo.length; v++)
			func(unitInfo[v])
		document.getElementById("unitInfo").focus()
	})
}

function resizeLists()
{
	document.getElementById("unitSelect").size = Math.max(10, document.documentElement.clientHeight / 20 - 8);
	document.getElementById("regionSelect").size = Math.max(10, document.documentElement.clientHeight / 20 - 8);
}

window.addEventListener("load", resizeLists);
window.addEventListener("resize", resizeLists);