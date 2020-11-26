package com.mecanica.org.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mecanica.org.web.rest.TestUtil;

public class TipoCombustibleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoCombustible.class);
        TipoCombustible tipoCombustible1 = new TipoCombustible();
        tipoCombustible1.setId(1L);
        TipoCombustible tipoCombustible2 = new TipoCombustible();
        tipoCombustible2.setId(tipoCombustible1.getId());
        assertThat(tipoCombustible1).isEqualTo(tipoCombustible2);
        tipoCombustible2.setId(2L);
        assertThat(tipoCombustible1).isNotEqualTo(tipoCombustible2);
        tipoCombustible1.setId(null);
        assertThat(tipoCombustible1).isNotEqualTo(tipoCombustible2);
    }
}
