package ma.projectteam.myapp;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("ma.projectteam.myapp");

        noClasses()
            .that()
            .resideInAnyPackage("ma.projectteam.myapp.service..")
            .or()
            .resideInAnyPackage("ma.projectteam.myapp.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..ma.projectteam.myapp.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
