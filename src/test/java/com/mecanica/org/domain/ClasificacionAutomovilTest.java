package com.mecanica.org.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mecanica.org.web.rest.TestUtil;

public class ClasificacionAutomovilTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClasificacionAutomovil.class);
        ClasificacionAutomovil clasificacionAutomovil1 = new ClasificacionAutomovil();
        clasificacionAutomovil1.setId(1L);
        ClasificacionAutomovil clasificacionAutomovil2 = new ClasificacionAutomovil();
        clasificacionAutomovil2.setId(clasificacionAutomovil1.getId());
        assertThat(clasificacionAutomovil1).isEqualTo(clasificacionAutomovil2);
        clasificacionAutomovil2.setId(2L);
        assertThat(clasificacionAutomovil1).isNotEqualTo(clasificacionAutomovil2);
        clasificacionAutomovil1.setId(null);
        assertThat(clasificacionAutomovil1).isNotEqualTo(clasificacionAutomovil2);
    }
}
