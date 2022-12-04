using System.Text;

static string AOCDay4Solution(string input) {
    var output = new StringBuilder();
    string[] lines = (input.IndexOf('\n') == -1) ? new string[] { input } : input.Split('\n');

    int fullyContainsCount = 0;

    foreach (var line in lines) {
        if (line.IndexOf(',') == -1) {
            continue;
        }
        
        string[] pair = line.Split(',');

        if (pair.Length < 2) {
            continue;
        }

        var pairRanges = new List<string>();

        bool fullyContains = false;

        for (int i = 0; i < pair.Length; i++) {
            string item = pair[i];

            if (item.IndexOf('-') == -1) {
                continue;
            }

            string[] numbers = item.Split('-');

            if (numbers.Length < 2) {
                continue;
            }
            
            var rangeSb = new StringBuilder();

            for (int j = Int32.Parse(numbers[0]); j <= Int32.Parse(numbers[1]); j++) {
                rangeSb.Append(j.ToString());
            }

            string range = rangeSb.ToString();

            output.Append($"{numbers[0]} to {numbers[1]}: \"{range}\"\n");

            pairRanges.Add(range);
        }

        if (pairRanges[0].IndexOf(pairRanges[1]) != -1) {
            fullyContains = true;
        }

        if (pairRanges[1].IndexOf(pairRanges[0]) != -1) {
            fullyContains = true;
        }

        if (fullyContains) {
            output.Append($"This assignment pair fully contains the other.\n\n");
            fullyContainsCount++;
        } else {
            output.Append($"\n");
        }
        
    }

    if (fullyContainsCount > 0) {
        output.Append($"There are {fullyContainsCount} assignment that fully contains the other\n");
    }

    return output.ToString().Trim();
}

using (var sr = new StreamReader(Console.OpenStandardInput(), Console.InputEncoding))
{
    Console.WriteLine(AOCDay4Solution(sr.ReadToEnd()));
}
