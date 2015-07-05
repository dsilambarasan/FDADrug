package work;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class testFDA {

  public static void main(String[] args) throws InterruptedException, IOException {
    // TODO Auto-generated method stub
    WebDriver driver = new FirefoxDriver();
    driver.get("http://ec2-52-25-63-237.us-west-2.compute.amazonaws.com/");
    driver.manage().window().maximize();
    //enter drug name
    driver.findElement(By.xpath("html/body/div[2]/div/div[1]/input")).sendKeys("ABACAVIR");
    Thread.sleep(2000);
    //seriousness check
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[1]/label/input")).click();
    Thread.sleep(2000);
    //serious
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[1]/label/div[1]/label/input")).click();
    Thread.sleep(2000);
    //method of reporting
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[2]/label/input")).click();
    Thread.sleep(2000);
    //via public
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[2]/label/div[1]/label/input")).click();
    Thread.sleep(2000);
    //gender check
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[3]/label/input")).click();
    Thread.sleep(2000);
    //male selected
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[3]/label/div[1]/label/input")).click();
    Thread.sleep(2000);
    //age group
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[4]/label/input")).click();
    Thread.sleep(2000);
    //cleared old entry
    driver.findElement(By.xpath(".//*[@id='min']")).clear();
    Thread.sleep(2000);
    //entered 1
    driver.findElement(By.xpath(".//*[@id='min']")).sendKeys("1");
    Thread.sleep(2000);
    //cleared old entry
    driver.findElement(By.xpath(".//*[@id='max']")).clear();
    Thread.sleep(2000);
    //enter max age
    driver.findElement(By.xpath(".//*[@id='max']")).sendKeys("100");
    Thread.sleep(2000);
    //check report received on
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[5]/label/input")).click();
    Thread.sleep(2000);
    //cleared old entry
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[5]/div/div[1]/input")).clear();
    Thread.sleep(2000);
    //min year entered
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[5]/div/div[1]/input")).sendKeys("1970");
    Thread.sleep(2000);
    //cleared old entry
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[5]/div/div[3]/input")).clear();
    Thread.sleep(2000);
    //entered max year
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[5]/div/div[3]/input")).sendKeys("2000");
    Thread.sleep(5000);
    System.out.println("Total adverse reaction : " +driver.findElement(By.xpath("html/body/div[2]/div/div[3]/div[6]/h1")).getText());


    TakesScreenshot snapper=(TakesScreenshot)driver;
    File tempScreenshot = snapper.getScreenshotAs(OutputType.FILE);
    System.out.println(tempScreenshot.getAbsolutePath());
    File myScreenshotDirectory = new File("C:\\temp\\screenshots");
    myScreenshotDirectory.mkdirs();
    File myScreenshot = new File(myScreenshotDirectory, "gotoPageScreen2.png");
    FileUtils.moveFile(tempScreenshot, myScreenshot);
    assertThat(myScreenshot.length(), is(greaterThan(0L)));
    driver.get("file://" + myScreenshot.getAbsolutePath());

    driver.quit();
    Thread.sleep(5000);


    driver=new FirefoxDriver();
    driver.get("http://ec2-52-25-63-237.us-west-2.compute.amazonaws.com/");
    driver.manage().window().maximize();
    //enter drug name
    driver.findElement(By.xpath("html/body/div[2]/div/div[1]/input")).sendKeys("ABACAVIR SULFATE");
    Thread.sleep(2000);
    //seriousness check
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[1]/label/input")).click();
    Thread.sleep(2000);
    //serious
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[1]/label/div[2]/label/input")).click();
    Thread.sleep(2000);
    //method of reporting
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[2]/label/input")).click();
    Thread.sleep(2000);
    //via public
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[2]/label/div[1]/label/input")).click();
    Thread.sleep(2000);
    //gender check
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[3]/label/input")).click();
    Thread.sleep(2000);
    //female selected
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[3]/label/div[2]/label/input")).click();
    Thread.sleep(2000);
    //age group
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[4]/label/input")).click();
    Thread.sleep(2000);
    //cleared old entry
    driver.findElement(By.xpath(".//*[@id='min']")).clear();
    Thread.sleep(2000);
    //entered 1
    driver.findElement(By.xpath(".//*[@id='min']")).sendKeys("1");
    Thread.sleep(2000);
    //cleared old entry
    driver.findElement(By.xpath(".//*[@id='max']")).clear();
    Thread.sleep(2000);
    //enter max age
    driver.findElement(By.xpath(".//*[@id='max']")).sendKeys("100");
    Thread.sleep(2000);
    //check report received on
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[5]/label/input")).click();
    Thread.sleep(2000);
    //cleared old entry
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[5]/div/div[1]/input")).clear();
    Thread.sleep(2000);
    //min year entered
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[5]/div/div[1]/input")).sendKeys("1980");
    Thread.sleep(2000);
    //cleared old entry
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[5]/div/div[3]/input")).clear();
    Thread.sleep(2000);
    //entered max year
    driver.findElement(By.xpath(".//*[@id='collapseExample']/div/div/div[5]/div/div[3]/input")).sendKeys("2015");
    Thread.sleep(5000);
    System.out.println("Total adverse reaction:" +driver.findElement(By.xpath("html/body/div[2]/div/div[3]/div[6]/h1")).getText());


    TakesScreenshot snapper1=(TakesScreenshot)driver;
    File tempScreenshot1 = snapper1.getScreenshotAs(OutputType.FILE);
    System.out.println(tempScreenshot.getAbsolutePath());
    File myScreenshotDirectory1 = new File("C:\\temp2\\screenshots");
    myScreenshotDirectory1.mkdirs();
    File myScreenshot1 = new File(myScreenshotDirectory1, "gotoPageScreen2.png");
    FileUtils.moveFile(tempScreenshot1, myScreenshot1);
    assertThat(myScreenshot1.length(), is(greaterThan(0L)));
    driver.get("file://" + myScreenshot1.getAbsolutePath());

    //driver.quit();
    Thread.sleep(5000);



  }


  private static void assertThat(long length, Object object) {
    // TODO Auto-generated method stub

  }


  private static Object is(Object greaterThan) {
    // TODO Auto-generated method stub
    return null;
  }

  private static Object greaterThan(long l) {
    // TODO Auto-generated method stub
    return null;
  }

}
