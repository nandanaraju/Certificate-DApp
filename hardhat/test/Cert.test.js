const {
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { expect } = require("chai");
  const { ethers } = require("hardhat");
  
  describe("Cert", function () {
    async function deployCertFixture() {
      const [admin, other] = await ethers.getSigners();
  
      const Cert = await ethers.getContractFactory("Cert");
      const cert = await Cert.deploy();
  
      return { admin, other, cert };
    }
  
    it("Should set the right admin value", async function () {
      const { cert, admin } = await loadFixture(deployCertFixture);
  
      expect(cert.deploymentTransaction().from).to.equal(admin.address);
    });
  
    it('Testing issue', async function () {
      const { cert } = await loadFixture(deployCertFixture);
      await expect(cert.issue(101, 'Nanda', 'EDP', 'A', '2nd Sep 2024'))
        .to.emit(cert, 'Issued')
        .withArgs('EDP', 101, 'A')
      
    })
  
    it('Read value', async function () {
      const { cert } = await loadFixture(deployCertFixture);
  
      await cert.issue(101, 'Nanda', 'EDP', 'A', '2nd Sep 2024')
      const certificates = await cert.Certificates(101)
      
      console.log("Data :", certificates)
  
      expect(certificates[0]).to.equal('Nanda')
      expect(certificates[1]).to.equal('EDP')
      expect(certificates[2]).to.equal('A')
      expect(certificates[3]).to.equal('2nd Sep 2024')
    })
  
    it("Test issue from another account", async function () {
      const { cert, other } = await loadFixture(deployCertFixture);
  
      await expect(cert.connect(other).issue(101, 'Nanda', 'EDP', 'A', '2nd Sep 2024'))
      .to.be.revertedWith('Access Denied')
    })
  });